import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CountdownTimer = () => {
	const [count, setCount] = useState(2);
	const navigate = useNavigate();

	const styles = {
		timerContainer: {
			height: "100vh", // Changed from minHeight to height
			width: "100vw", // Added full viewport width
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			background: "linear-gradient(135deg, white 0%, #764ba2 100%)",
			position: "fixed", // Added fixed position
			top: 0, // Added to ensure full screen coverage
			left: 0, // Added to ensure full screen coverage
		},
		timerDisplay: {
			padding: "2rem 4rem",
			borderRadius: "1rem",
			background: "rgba(255, 255, 255, 0.1)",
			backdropFilter: "blur(10px)",
			boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
			color: "white",
			textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
			animation: "pulse 1s infinite",
			"@media (maxWidth: 640px)": {
				padding: "1.5rem 3rem",
				fontSize: "3rem",
			},
		},
		"@keyframes pulse": {
			"0%": { transform: "scale(1)" },
			"50%": { transform: "scale(1.05)" },
			"100%": { transform: "scale(1)" },
		},
	};

	useEffect(() => {
		const timer = setInterval(() => {
			setCount((prevCount) => {
				if (prevCount <= 1) {
					clearInterval(timer);
					// Add a small delay before navigation
					setTimeout(() => {
						navigate("/portfolio");
					}, 1000);
				}
				return prevCount - 1;
			});
		}, 1000);

		// Add keyframe animation to document
		const styleSheet = document.createElement("style");
		styleSheet.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
        `;
		document.head.appendChild(styleSheet);

		return () => {
			clearInterval(timer);
			document.head.removeChild(styleSheet);
		};
	}, [navigate]);

	return (
		<div style={styles.timerContainer}>
			<div style={styles.timerDisplay}>{count > 0 ? count : "Go!"}</div>
		</div>
	);
};

export default CountdownTimer;
