import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css"; // 載入 bootstrap 核心樣式
import "./index.css";
import router from "./router";
import { RouterProvider } from "react-router-dom";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
