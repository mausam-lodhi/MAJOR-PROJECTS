import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App";
import "./index.css";
// ...existing code...

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<App />
	</StrictMode>
);
