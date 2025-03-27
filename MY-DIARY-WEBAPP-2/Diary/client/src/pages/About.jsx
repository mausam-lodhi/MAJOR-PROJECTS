// src/pages/About.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBook, 
  faLock, 
  faCloud, 
  faMobile, 
  faEdit, 
  faUserShield 
} from '@fortawesome/free-solid-svg-icons';

const About = () => {
  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h1 className="text-center mb-4">
            <FontAwesomeIcon icon={faBook} className="me-2" />
            About Personal Diary
          </h1>
          
          <div className="row mb-5">
            <div className="col-md-8 mx-auto">
              <p className="lead text-center">
                A secure and personal space for capturing your thoughts, memories, and daily experiences.
              </p>
            </div>
          </div>

          {/* Key Features Section */}
          <div className="row g-4 mb-5">
            <div className="col-md-4">
              <div className="text-center p-3">
                <FontAwesomeIcon icon={faLock} size="2x" className="text-primary mb-3" />
                <h4>Secure</h4>
                <p className="text-muted">
                  Your entries are protected with advanced encryption and secure authentication.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center p-3">
                <FontAwesomeIcon icon={faCloud} size="2x" className="text-primary mb-3" />
                <h4>Cloud Storage</h4>
                <p className="text-muted">
                  All your entries are safely stored in the cloud and accessible anywhere.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center p-3">
                <FontAwesomeIcon icon={faMobile} size="2x" className="text-primary mb-3" />
                <h4>Responsive Design</h4>
                <p className="text-muted">
                  Access your diary from any device with our mobile-friendly interface.
                </p>
              </div>
            </div>
          </div>

          {/* Main Features List */}
          <div className="row mb-5">
            <div className="col-md-6">
              <h3 className="mb-4">Core Features</h3>
              <div className="list-group">
                <div className="list-group-item">
                  <FontAwesomeIcon icon={faEdit} className="text-primary me-2" />
                  Create and edit diary entries
                </div>
                <div className="list-group-item">
                  <FontAwesomeIcon icon={faBook} className="text-primary me-2" />
                  Organize entries by date
                </div>
                <div className="list-group-item">
                  <FontAwesomeIcon icon={faUserShield} className="text-primary me-2" />
                  Secure user authentication
                </div>
                <div className="list-group-item">
                  <FontAwesomeIcon icon={faCloud} className="text-primary me-2" />
                  Automatic cloud backup
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <h3 className="mb-4">Technical Details</h3>
              <div className="card bg-light">
                <div className="card-body">
                  <h5 className="card-title">Technology Stack</h5>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2">
                      <strong>Frontend:</strong> React.js, Bootstrap
                    </li>
                    <li className="mb-2">
                      <strong>Backend:</strong> Node.js, Express.js
                    </li>
                    <li className="mb-2">
                      <strong>Database:</strong> MongoDB
                    </li>
                    <li className="mb-2">
                      <strong>Authentication:</strong> JWT (JSON Web Tokens)
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* How to Use Section */}
          <div className="row">
            <div className="col-12">
              <h3 className="mb-4">How to Use</h3>
              <div className="card bg-light">
                <div className="card-body">
                  <ol className="mb-0">
                    <li className="mb-2">
                      Register for a new account or login if you already have one
                    </li>
                    <li className="mb-2">
                      Click on "Add Entry" to create your first diary entry
                    </li>
                    <li className="mb-2">
                      Write your thoughts, add a title and select the date
                    </li>
                    <li className="mb-2">
                      View all your entries in the "My Diary" section
                    </li>
                    <li className="mb-2">
                      Edit or delete entries as needed from your diary view
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="row mt-5">
            <div className="col-12">
              <div className="text-center text-muted">
                <p>Version 1.0.0</p>
                <p>© 2024 Personal Diary. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;