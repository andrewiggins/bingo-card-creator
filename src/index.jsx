import { render } from "preact";
import "./index.css";
import { Settings } from "./Settings.jsx";
import { settings } from "./model.js";
import { Board } from "./Board.jsx";
import { useCallback, useMemo, useState } from "preact/hooks";
import { Boards } from "./Boards.jsx";

function App() {
	const [id, updateId] = useState(0);
	const forceUpdate = useCallback(() => updateId((id) => id + 1), []);

	/** @type {Settings} */
	const deadSettings = useMemo(
		() => JSON.parse(JSON.stringify(settings)),
		[id],
	);

	return (
		<>
			<div class="setup">
				<h1>Bingo Card Generator</h1>
				<h2>Settings</h2>
				<Settings settings={settings} onGenerate={forceUpdate} />
				<h2>Preview</h2>
				<Boards settings={{ ...deadSettings, count: 2 }} />
			</div>
			<h2>Boards</h2>
			<Boards settings={deadSettings} />
		</>
	);
}

const container = /** @type {HTMLElement} */ (document.getElementById("root"));
render(<App />, container);
