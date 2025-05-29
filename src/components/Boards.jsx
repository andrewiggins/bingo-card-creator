import { useMemo, useErrorBoundary } from "preact/hooks";
import { Board } from "./Board.jsx";
import { memo } from "../utils/memo.js";
import { generateBoards } from "../model.js";

/**
 * @param {{ children: preact.ComponentChildren }} props
 * @returns {preact.VNode<any> | null}
 */
function BoardErrorBoundary({ children }) {
	const [error] = useErrorBoundary();
	return error ? (
		<div class="error">Error generating board: {error.message}</div>
	) : (
		<>{children}</>
	);
}

/** @type {import('preact').FunctionComponent<{ settings: Settings, rng?: () => number }>} */
const ShowBoards = memo(function Boards({ settings, rng }) {
	/** @type {Boards} */
	const boardData = useMemo(
		() => generateBoards(settings, rng),
		[settings, rng],
	);

	const boardJsx = [];
	for (let board of boardData.boards) {
		boardJsx.push(<Board key={board.hash} settings={settings} board={board} />);
	}

	return <div class="boards">{boardJsx}</div>;
});

export const Boards = memo(function BoardsWrapper({ settings, rng }) {
	return (
		<BoardErrorBoundary>
			<ShowBoards settings={settings} rng={rng} />
		</BoardErrorBoundary>
	);
});
