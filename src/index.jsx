import { render } from "preact";
import { Settings } from "./Settings.jsx";
import { settings } from "./model.js";

import "./index.css";
import { Board } from "./Board.jsx";

function App() {
	return (
		<>
			<div class="setup">
				<h1>Bingo Card Generator</h1>
				<Settings settings={settings} />
				<Board settings={settings} />
			</div>
			<div class="boards">
				<Board settings={settings} />
				<Board settings={settings} />
			</div>
		</>
	);
}

const container = /** @type {HTMLElement} */ (document.getElementById("root"));
render(<App />, container);
