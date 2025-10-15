import React from "react";
import { createRoot } from "react-dom/client";
import PortalResultadosReactSolo from "./PortalResultadosReactSolo.jsx";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PortalResultadosReactSolo />
  </React.StrictMode>
);
