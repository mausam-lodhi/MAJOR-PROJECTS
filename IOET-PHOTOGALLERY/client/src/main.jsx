import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";
// filepath: /c:/Users/mausam/Downloads/portreto - Copy/client/src/index.js
import "./index.css";
// ...existing code...

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<App />
	</StrictMode>
);
