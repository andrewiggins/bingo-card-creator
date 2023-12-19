import { Settings } from "./Settings.jsx";
import { settings, unsignalSettings } from "../model.js";
import { useCallback, useState } from "preact/hooks";
import { Boards } from "./Boards.jsx";
import { PreviewBoards } from "./PreviewBoards";

const initialCommittedSettings = unsignalSettings(settings);

export function App() {
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
