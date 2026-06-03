import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { WizardProvider } from "@/context/wizard-context";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <WizardProvider>
        <App />
      </WizardProvider>
    </BrowserRouter>
  </StrictMode>,
);
