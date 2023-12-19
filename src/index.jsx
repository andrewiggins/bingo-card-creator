import { render } from "preact";
import { App } from "./components/App.jsx";
import "./styles/index.css";

const container = /** @type {HTMLElement} */ (document.getElementById("root"));
render(<App />, container);
