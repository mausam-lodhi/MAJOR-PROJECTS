# face-api/face-server.py
from flask import Flask, request, jsonify
import face_recognition
import numpy as np
import requests
from PIL import Image
import io
import pickle
import os
import uuid
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
# In-memory storage for face encodings (in production, use a database)
face_encodings_db = {}


def download_image(image_url):
    """Download image from URL and return as PIL Image"""
    try:
        response = requests.get(image_url)
        response.raise_for_status()
        return Image.open(io.BytesIO(response.content))
    except Exception as e:
        print(f"Error downloading image: {e}")
        return None


def pil_to_numpy(pil_image):
    """Convert PIL Image to numpy array for face_recognition"""
    return np.array(pil_image)


@app.route('/encode', methods=['POST'])
def encode_face():
    """
    Encode a face from an image URL and associate it with a name
    Expected payload: {"name": "John Doe", "image_url": "https://..."}
    """
    try:
        data = request.get_json()
        name = data.get('name')
        image_url = data.get('image_url')

        if not name or not image_url:
            return jsonify({"error": "Name and image_url are required"}), 400

        # Download and process image
        pil_image = download_image(image_url)
        if pil_image is None:
            return jsonify({"error": "Failed to download image"}), 400

        # Convert to RGB if needed
        if pil_image.mode != 'RGB':
            pil_image = pil_image.convert('RGB')

        # Convert to numpy array
        image_array = pil_to_numpy(pil_image)

        # Find face locations and encodings
        face_locations = face_recognition.face_locations(image_array)

        if not face_locations:
            return jsonify({"error": "No face found in the image"}), 400

        face_encodings = face_recognition.face_encodings(
            image_array, face_locations)

        if not face_encodings:
            return jsonify({"error": "Could not encode face"}), 400

        # Use the first face found
        face_encoding = face_encodings[0]

        # Generate unique encoding ID
        encoding_id = str(uuid.uuid4())

        # Store encoding
        face_encodings_db[encoding_id] = {
            'name': name,
            'encoding': face_encoding.tolist(),  # Convert to list for JSON serialization
            'image_url': image_url
        }

        print(f"✅ Encoded face for {name} with ID {encoding_id}")

        return jsonify({
            "message": "Face encoded successfully",
            "encoding_id": encoding_id,
            "name": name
        })

    except Exception as e:
        print(f"Error in encode_face: {e}")
        return jsonify({"error": str(e)}), 500


@app.route('/match', methods=['POST'])
def match_faces():
    """
    Find matching faces in an image
    Expected payload: {"image_url": "https://..."}
    """
    try:
        data = request.get_json()
        image_url = data.get('image_url')

        if not image_url:
            return jsonify({"error": "image_url is required"}), 400

        # Download and process image
        pil_image = download_image(image_url)
        if pil_image is None:
            return jsonify({"error": "Failed to download image"}), 400

        # Convert to RGB if needed
        if pil_image.mode != 'RGB':
            pil_image = pil_image.convert('RGB')

        # Convert to numpy array
        image_array = pil_to_numpy(pil_image)

        # Find face locations and encodings
        face_locations = face_recognition.face_locations(image_array)

        if not face_locations:
            return jsonify({
                "message": "No faces found in image",
                "matched_names": []
            })

        face_encodings = face_recognition.face_encodings(
            image_array, face_locations)

        matched_names = []

        # Compare with stored encodings
        for face_encoding in face_encodings:
            for encoding_id, stored_data in face_encodings_db.items():
                stored_encoding = np.array(stored_data['encoding'])

                # Compare faces (tolerance can be adjusted)
                matches = face_recognition.compare_faces(
                    [stored_encoding], face_encoding, tolerance=0.5)

                if matches[0]:
                    name = stored_data['name']
                    if name not in matched_names:
                        matched_names.append(name)

        print(f"✅ Found {len(matched_names)} matches: {matched_names}")

        return jsonify({
            "message": f"Found {len(matched_names)} matching faces",
            "matched_names": matched_names,
            "total_faces_detected": len(face_encodings)
        })

    except Exception as e:
        print(f"Error in match_faces: {e}")
        return jsonify({"error": str(e)}), 500


@app.route('/reprocess-events', methods=['POST'])
def reprocess_events():
    """
    Reprocess all event photos against a specific student's encoding
    Expected payload: {
        "student_encoding_id": "uuid",
        "event_photos": [
            {"photo_id": "mongo_id", "image_url": "https://..."},
            ...
        ]
    }
    """
    try:
        data = request.get_json()
        student_encoding_id = data.get('student_encoding_id')
        event_photos = data.get('event_photos', [])

        if not student_encoding_id or student_encoding_id not in face_encodings_db:
            return jsonify({"error": "Invalid or missing student encoding ID"}), 400

        if not event_photos:
            return jsonify({
                "message": "No event photos to process",
                "matched_events": []
            })

        # Get the student's face encoding
        student_data = face_encodings_db[student_encoding_id]
        student_encoding = np.array(student_data['encoding'])
        student_name = student_data['name']

        matched_events = []

        print(
            f"🔄 Reprocessing {len(event_photos)} event photos for {student_name}")

        # Process each event photo
        for event_photo in event_photos:
            photo_id = event_photo.get('photo_id')
            image_url = event_photo.get('image_url')

            if not photo_id or not image_url:
                continue

            try:
                # Download and process image
                pil_image = download_image(image_url)
                if pil_image is None:
                    print(f"⚠️ Failed to download image: {image_url}")
                    continue

                # Convert to RGB if needed
                if pil_image.mode != 'RGB':
                    pil_image = pil_image.convert('RGB')

                # Convert to numpy array
                image_array = pil_to_numpy(pil_image)

                # Find face locations and encodings
                face_locations = face_recognition.face_locations(image_array)

                if not face_locations:
                    continue

                face_encodings = face_recognition.face_encodings(
                    image_array, face_locations)

                # Compare with student's encoding
                for face_encoding in face_encodings:
                    matches = face_recognition.compare_faces(
                        [student_encoding], face_encoding, tolerance=0.5)

                    if matches[0]:
                        matched_events.append({
                            "photo_id": photo_id,
                            "image_url": image_url,
                            "student_name": student_name
                        })
                        print(
                            f"✅ Found {student_name} in event photo {photo_id}")
                        break  # Found match, no need to check other faces in this photo

            except Exception as e:
                print(f"⚠️ Error processing event photo {photo_id}: {e}")
                continue

        print(
            f"🎯 Reprocessing complete: {len(matched_events)} matches found for {student_name}")

        return jsonify({
            "message": f"Reprocessing complete for {student_name}",
            "student_name": student_name,
            "total_events_processed": len(event_photos),
            "matched_events": matched_events,
            "total_matches": len(matched_events)
        })

    except Exception as e:
        print(f"Error in reprocess_events: {e}")
        return jsonify({"error": str(e)}), 500


@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "total_stored_encodings": len(face_encodings_db)
    })


@app.route('/debug/encodings', methods=['GET'])
def debug_encodings():
    """Debug endpoint to see stored encodings"""
    debug_data = {}
    for encoding_id, data in face_encodings_db.items():
        debug_data[encoding_id] = {
            'name': data['name'],
            'image_url': data['image_url']
        }
    return jsonify(debug_data)


if __name__ == '__main__':
    print("🚀 Starting Face Recognition Server...")
    print("📊 Endpoints:")
    print("  POST /encode - Encode a face from image URL")
    print("  POST /match - Find matching faces in image")
    print("  POST /reprocess-events - Reprocess event photos for a student")
    print("  GET /health - Health check")
    print("  GET /debug/encodings - View stored encodings")

    app.run(host='0.0.0.0', port=5001, debug=True)
