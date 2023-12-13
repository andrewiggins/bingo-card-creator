import { render } from "preact";
import { useComputed } from "@preact/signals";
import "./index.css";
import { Settings } from "./Settings.jsx";
import { settings, unsignalSettings } from "./model.js";
import { useCallback, useMemo, useState } from "preact/hooks";
import { Boards } from "./Boards.jsx";
import { createMulberry32 } from "./mulberry32";

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
				<PreviewBoards />
			</div>
			<h2>Boards</h2>
			<Boards settings={deadSettings} />
		</>
	);
}

const newSeed = () => Math.random() * 2 ** 32;

function PreviewBoards() {
	const previewSettings = useComputed(() => ({
		...unsignalSettings(settings),
		count: 2,
	}));

	const [seed, setSeed] = useState(newSeed);

	// Recreate a new RNG each render with the same seed so we purposefully get the
	// same boards on each rerender. Only reseed the RNG when the user clicks the
	// "New preview boards" button.
	const mulberry32 = createMulberry32(seed);
	const rng = () => mulberry32.next();

	return (
		<>
			<h2>Preview</h2>
			<button type="button" onClick={() => setSeed(newSeed())}>
				New preview boards
			</button>
			<Boards settings={previewSettings.value} rng={rng} />
		</>
	);
}

const container = /** @type {HTMLElement} */ (document.getElementById("root"));
render(<App />, container);
