import { store } from "@/store/store.ts";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import Loading from "@/components/Loading/Loading.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Loading />
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
