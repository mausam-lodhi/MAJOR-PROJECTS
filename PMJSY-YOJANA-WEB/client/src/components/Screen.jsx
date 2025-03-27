import React from "react";

const styles = {
	Screen: {
		backgroundColor: "#ffffff",
		// Add responsive styles
		"@media (max-width: 768px)": {
			padding: "1rem",
		},
	},
};

const Screen = (props) => {
	return <div style={styles.Screen}>{props.children}</div>;
};

export default Screen;
