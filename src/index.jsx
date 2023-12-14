import { render } from "preact";
import "./styles/index.css";
import { Settings } from "./components/Settings.jsx";
import { settings, unsignalSettings } from "./model.js";
import { useCallback, useState } from "preact/hooks";
import { Boards } from "./components/Boards.jsx";
import { PreviewBoards } from "./components/PreviewBoards";

const initialCommittedSettings = unsignalSettings(settings);

function App() {
	const [committedSettings, setCommittedSettings] = useState(
		initialCommittedSettings,
	);

	const onGenerate = useCallback(() => {
		setCommittedSettings(unsignalSettings(settings));
	}, []);

	return (
		<>
			<div class="setup">
				<h1>Bingo Card Generator</h1>
				<h2>Settings</h2>
				<Settings settings={settings} onGenerate={onGenerate} />
				<PreviewBoards />
			</div>
			<h2>Boards</h2>
			<Boards settings={committedSettings} />
		</>
	);
}

const container = /** @type {HTMLElement} */ (document.getElementById("root"));
render(<App />, container);
