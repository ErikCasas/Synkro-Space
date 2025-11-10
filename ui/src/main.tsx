import ReactDOM from "react-dom/client";
import "@/styles/globals.css";
import { StrictMode } from 'react';
import { RouterProvider } from '@providers';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider/>
  </StrictMode>,
);
