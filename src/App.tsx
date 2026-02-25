import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter } from "react-router-dom";

import AppInitializer from "./components/AppInitializer/AppInitializer";
import AppRouter from "./routes/AppRouter";
import "./App.css";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppInitializer />
        <AppRouter />
      </BrowserRouter>
    </Provider>
  );
}
