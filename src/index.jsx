import { render } from "preact";
import { untracked } from "@preact/signals";
import "./index.css";
import { Settings } from "./Settings.jsx";
import { settings, unsignalSettings } from "./model.js";
import { useCallback, useMemo, useState } from "preact/hooks";
import { Boards } from "./Boards.jsx";
import { PreviewBoards } from "./PreviewBoards";

function App() {
	const [id, updateId] = useState(0);
	const forceUpdate = useCallback(() => updateId((id) => id + 1), []);

	/** @type {Settings} */
	const rawSettings = useMemo(
		() => untracked(() => unsignalSettings(settings)),
		[id],
	);

	return (
		<>
			<div class="setup">
				<h1>Bingo Card Generator</h1>
				<h2>Settings</h2>
				<Settings settings={settings} onGenerate={forceUpdate} />
				<PreviewBoards />
			</div>
			<h2>Boards</h2>
			<Boards settings={rawSettings} />
		</>
	);
}

const container = /** @type {HTMLElement} */ (document.getElementById("root"));
render(<App />, container);
