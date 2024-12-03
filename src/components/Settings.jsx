import { useCallback, useId } from "preact/hooks";

/** @type {Set<Settings["grid"]>} */
const gridChoices = new Set(["5x5"]);

/** @param {{ settings: SettingsSignals; onGenerate(): void }} props */
export function Settings({ settings, onGenerate }) {
	return (
		<div class="settings-form">
			<TextField name="title" label="Title" signal={settings.$title} />
			<TextField
				name="description"
				label="Description"
				signal={settings.$description}
			/>
			<Choice name="grid" label="Grid" choices={gridChoices} />
			<NumberField
				name="count"
				label="Number of boards"
				signal={settings.$count}
			/>
			<TextField
				name="backgroundImageURL"
				label="Background Image URL"
				signal={settings.$backgroundImageUrl}
			/>
			<EntriesField name="entries" label="Entries" signal={settings.$entries} />
			<div>
				<button onClick={onGenerate}>Generate</button>
			</div>
		</div>
	);
}

/** @param {{ name: string; label: string; signal: Signal<string> | undefined; }} props */
function TextField({ name, label, signal }) {
	const id = useId();

	/** @type {preact.JSX.InputEventHandler<HTMLInputElement>} */
	const onInput = useCallback(
		(e) => {
			if (!signal) return;
			signal.value = e.currentTarget.value;
		},
		[signal],
	);

	return (
		<div>
			<label for={id}>{label}</label>
			<input type="text" id={id} name={name} value={signal} onInput={onInput} />
		</div>
	);
}

/** @param {{ name: string; label: string; signal: Signal<number> | undefined; }} props */
function NumberField({ name, label, signal }) {
	const id = useId();

	/** @type {preact.JSX.InputEventHandler<HTMLInputElement>} */
	const onInput = useCallback(
		(e) => {
			if (!signal) return;
			signal.value = e.currentTarget.valueAsNumber;
		},
		[signal],
	);

	return (
		<div>
			<label for={id}>{label}</label>
			<input
				type="number"
				id={id}
				name={name}
				value={signal}
				onInput={onInput}
			/>
		</div>
	);
}

/** @param {{ name: string; label: string; signal: Signal<string[]> | undefined; }} props */
function EntriesField({ name, label, signal }) {
	const id = useId();

	/** @type {preact.JSX.InputEventHandler<HTMLTextAreaElement>} */
	const onInput = useCallback(
		(e) => {
			if (!signal) return;
			signal.value = e.currentTarget.value.split("\n");
		},
		[signal],
	);

	const value = signal?.value.join("\n") ?? "";

	return (
		<div>
			<label for={id}>{label}</label>
			<textarea
				id={id}
				name={name}
				value={value}
				onInput={onInput}
				rows={10}
				cols={40}
				wrap="off"
			></textarea>
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
