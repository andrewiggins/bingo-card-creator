import { render } from "preact";
import { useComputed } from "@preact/signals";
import "./index.css";
import { Settings } from "./Settings.jsx";
import { settings, unsignalSettings } from "./model.js";
import { useCallback, useMemo, useState } from "preact/hooks";
import { Boards } from "./Boards.jsx";

function App() {
	const [id, updateId] = useState(0);
	const forceUpdate = useCallback(() => updateId((id) => id + 1), []);

	/** @type {Settings} */
	const deadSettings = useMemo(() => unsignalSettings(settings), [id]);

	return (
		<>
			<div class="setup">
				<h1>Bingo Card Generator</h1>
				<h2>Settings</h2>
				<Settings settings={settings} onGenerate={forceUpdate} />
				<h2>Preview</h2>
				<PreviewBoards />
			</div>
			<h2>Boards</h2>
			<Boards settings={deadSettings} />
		</>
	);
}

function PreviewBoards() {
	const previewSettings = useComputed(() => ({
		...unsignalSettings(settings),
		count: 2,
	}));
	return <Boards settings={previewSettings.value} />;
}

const container = /** @type {HTMLElement} */ (document.getElementById("root"));
render(<App />, container);
