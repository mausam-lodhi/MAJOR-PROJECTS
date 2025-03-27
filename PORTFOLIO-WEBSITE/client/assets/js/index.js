document.getElementById("contactForm").addEventListener("submit", async (e) => {
	e.preventDefault();

	const formData = {
		name: document.getElementById("name").value,
		email: document.getElementById("email").value,
		message: document.getElementById("message").value,
	};

	try {
		const response = await fetch("https://mausamm-portfolio.onrender.com/sendEmail", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formData),
		});
		console.log("Received message:", response);

		if (response.ok) {
			alert("Message sent successfully!");
			resetForm();
		} else {
			alert("Failed to send message. Please try again.");
		}
	} catch (error) {
		console.error("Error:", error);
		alert("An error occurred. Please try again.");
	}
});

function resetForm() {
	document.getElementById("contactForm").reset();
}

function soon() {
	window.location.href = "soon.html";
}
