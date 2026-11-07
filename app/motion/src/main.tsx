import React from "react";
import { createRoot } from "react-dom/client";
import "@/foundation.css";
import "@shared/styles/global.css";
import { Workbench } from "@shared/Workbench";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Workbench library="motion" />
  </React.StrictMode>
);