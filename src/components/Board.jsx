import { useResizeText } from "../utils/useResizeText";

/** @param {{ settings: Settings; board: Board; }} props */
export function Board({ settings, board }) {
	let gridComponent;
	if (settings.grid === "5x5") {
		gridComponent = (
			<TwentyFiveGrid board={board} isHumanBingo={settings.humanBingo} />
		);
	} else if (settings.grid === "36-bingo") {
		gridComponent = (
			<ThirtySixGrid board={board} isHumanBingo={settings.humanBingo} />
		);
	} else {
		throw new Error(`Unknown grid type: ${settings.grid}`);
	}

	return (
		<div
			class="board"
			style={{
				"--board-background-image": `url(${settings.backgroundImageUrl})`,
			}}
		>
			<h2 class="board-title">{settings.title}</h2>
			<p class="board-desc">{settings.description}</p>
			<div class="grid-wrapper">{gridComponent}</div>
			<div class="board-footer">
				<sub class="board-hash">ID: {board.hash}</sub>
			</div>
		</div>
	);
}

/** @type {(props: { board: Board, isHumanBingo: boolean }) => any} */
function TwentyFiveGrid({ board, isHumanBingo }) {
	const rows = [0, 1, 2, 3, 4];
	const cols = [0, 1, 2, 3, 4];

	return (
		<table class={`grid twenty-five-grid ${isHumanBingo ? "human-bingo" : ""}`}>
			<tbody>
				{rows.map((row) => (
					<tr key={row} class="row">
						{cols.map((col) => {
							const index = row * rows.length + col;
							const entry = board.entries[index];
							return (
								<Cell
									key={entry}
									entry={entry}
									isFreeSpace={index === board.freeSpaceIndex}
									isHumanBingo={isHumanBingo}
								/>
							);
						})}
					</tr>
				))}
			</tbody>
		</table>
	);
}

/** @param {{ entry: string; isFreeSpace: boolean; isHumanBingo: boolean }} props */
function Cell({ entry, isFreeSpace, isHumanBingo }) {
	const [ref, fontSize] = useResizeText(entry, isHumanBingo ? 3 : 5);

	return (
		<td class={`cell ${isFreeSpace ? "free-space" : ""}`}>
			<span class="cell-text" style={{ fontSize }} ref={ref}>
				{entry}
			</span>
			{isHumanBingo && (
				<>
					<br />
					<br />
				</>
			)}
		</td>
	);
}

/** @type {(props: { board: Board, isHumanBingo: boolean }) => any} */
export function ThirtySixGrid() {
	throw new Error("Not implemented");
}
