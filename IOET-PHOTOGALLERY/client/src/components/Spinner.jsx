import React from "react";
import { Box, CircularProgress } from "@mui/material";

const PageLoader = () => {
	return (
		<Box
			sx={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				backgroundColor: "rgba(255, 255, 255, 0.8)",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				zIndex: 9999,
			}}>
			<CircularProgress size={60} />
		</Box>
	);
};

export default PageLoader;
