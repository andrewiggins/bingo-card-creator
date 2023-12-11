/** @param {SettingsSignals} props */
export function Board(props) {
	const { title, grid } = props;

	let gridComponent;
	if (grid.value === "5x5") {
		gridComponent = <TwentyFiveGrid {...props} />;
	} else if (grid.value === "36-bingo") {
		gridComponent = <ThirtySixGrid {...props} />;
	} else {
		throw new Error(`Unknown grid type: ${grid}`);
	}

	return (
		<div class="board">
			<h2 class="title">{title}</h2>
			<div class="grid-wrapper">{gridComponent}</div>
		</div>
	);
}

/** @type {(props: SettingsSignals) => any} */
function TwentyFiveGrid({ entries }) {
	const rows = [0, 1, 2, 3, 4];
	const cols = [0, 1, 2, 3, 4];

	/*
	   0  1  2  3  4
	  ===============
	0| 0  1  2  3  4
	1| 5  6  7  8  9
	2| 10 11 12 13 14
	*/

	return (
		<table class="twenty-five-grid">
			<tbody>
				{rows.map((row) => (
					<tr key={row} class="row">
						{cols.map((col) => (
							<td key={col} class="col">
								{entries.value[rows.length * row + col] ?? ""}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}

/** @type {(props: SettingsSignals) => any} */
export function ThirtySixGrid() {
	throw new Error("Not implemented");
}
