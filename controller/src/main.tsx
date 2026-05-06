import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./routes/router";
import { SessionProvider } from "./context/Sessioncontext";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <SessionProvider>
            <RouterProvider router={router} />
        </SessionProvider>
    </StrictMode>
);
