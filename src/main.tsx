import ReactDOM from "react-dom/client";
import { store } from "./components/app/store.ts";
import { Provider } from "react-redux";
import App from "./components/app/App.tsx";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
