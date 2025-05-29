import { useMemo, useErrorBoundary } from "preact/hooks";
import { Board } from "./Board.jsx";
import { memo } from "../utils/memo.js";
import { generateBoards } from "../model.js";

/** @type {import('preact').FunctionComponent<{ settings: Settings, rng?: () => number }>} */
export const Boards = memo(function Boards({ settings, rng }) {
	/** @type {{ boardData: Boards | undefined; error: string | undefined }} */
	const { boardData, error } = useMemo(() => {
		let error;
		let boardData;
		try {
			boardData = generateBoards(settings, rng);
		} catch (err) {
			if (err instanceof Error) {
				error = err.message;
			} else {
				error = String(err);
			}
		}

		return { error, boardData };
	}, [settings, rng]);

	if (error) {
		return <div class="error">Error generating boards: {error}</div>;
	}

	if (!boardData) {
		return (
			<div class="error">Error generating board: boardData is undefined</div>
		);
	}

	const boardJsx = [];
	for (let board of boardData.boards) {
		boardJsx.push(<Board key={board.hash} settings={settings} board={board} />);
	}

	return <div class="boards">{boardJsx}</div>;
});
