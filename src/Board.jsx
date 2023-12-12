/** @param {{ settings: SettingsSignals }} props */
export function Board({ settings }) {
	let gridComponent;
	if (settings.grid === "5x5") {
		gridComponent = <TwentyFiveGrid settings={settings} />;
	} else if (settings.grid === "36-bingo") {
		gridComponent = <ThirtySixGrid settings={settings} />;
	} else {
		throw new Error(`Unknown grid type: ${settings.grid}`);
	}

	return (
		<div class="board">
			<h2 class="title">{settings.title}</h2>
			<div class="grid-wrapper">{gridComponent}</div>
		</div>
	);
}

/** @type {(props: {settings: SettingsSignals}) => any} */
function TwentyFiveGrid({ settings }) {
	const rows = [0, 1, 2, 3, 4];
	const cols = [0, 1, 2, 3, 4];

	return (
		<table
			class={`grid twenty-five-grid ${
				settings.humanBingo ? "human-bingo" : ""
			}`}
		>
			<tbody>
				{rows.map((row) => (
					<tr key={row} class="row">
						{cols.map((col) => (
							<Cell
								settings={settings}
								max={25}
								index={row * rows.length + col}
							/>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}

/** @param {{ settings: SettingsSignals; max: number; index: number; }} props */
function Cell({ settings, index, max }) {
	if (settings.freeSpace && index === Math.floor(max / 2)) {
		return (
			<td key={index} class="cell free-space">
				<span class="cell-text">{settings.freeSpace.entry}</span>
			</td>
		);
	}

	return (
		<td key={index} class="cell">
			<span class="cell-text">{settings.entries[index] ?? ""}</span>
			{settings.humanBingo && (
				<>
					<br />
					<br />
				</>
			)}
		</td>
	);
}

/** @type {(props: {settings: SettingsSignals}) => any} */
export function ThirtySixGrid() {
	throw new Error("Not implemented");
}
