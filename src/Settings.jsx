import { useCallback, useId } from "preact/hooks";

/** @type {Set<Settings["grid"]>} */
const gridChoices = new Set(["5x5"]);

/** @param {{ settings: SettingsSignals }} props */
export function Settings({ settings }) {
	return (
		<div>
			<h2>Bingo Card Settings</h2>
			<TextField name="title" label="Title" signal={settings.title} />
			<EntriesField name="entries" label="Entries" signal={settings.entries} />
			<Choice name="grid" label="Grid" choices={gridChoices} />
		</div>
	);
}

/** @param {{ name: string; label: string; signal: Signal<string>; }} props */
function TextField({ name, label, signal }) {
	const id = useId();

	/** @type {preact.JSX.InputEventHandler<HTMLInputElement>} */
	const onInput = useCallback(
		(e) => (signal.value = e.currentTarget.value),
		[signal],
	);

	return (
		<div>
			<label for={id}>{label}</label>
			<input type="text" id={id} name={name} value={signal} onInput={onInput} />
		</div>
	);
}

/** @param {{ name: string; label: string; signal: Signal<string[]>; }} props */
function EntriesField({ name, label, signal }) {
	const id = useId();

	/** @type {preact.JSX.InputEventHandler<HTMLTextAreaElement>} */
	const onInput = useCallback(
		(e) => {
			signal.value = e.currentTarget.value.split("\n").map((s) => s.trim());
		},
		[signal],
	);

	const value = signal.value.join("\n");

	return (
		<div>
			<label for={id}>{label}</label>
			<textarea id={id} name={name} value={value} onInput={onInput}></textarea>
		</div>
	);
}

/** @param {{ name: string; label: string; choices: Set<string>; }} props */
function Choice({ name, label, choices }) {
	const id = useId();

	const options = [...choices].map((choice) => (
		<option key={choice} value={choice}>
			{choice}
		</option>
	));

	return (
		<div>
			<label for={id}>{label}</label>
			<select id={id} name={name}>
				{options}
			</select>
		</div>
	);
}
