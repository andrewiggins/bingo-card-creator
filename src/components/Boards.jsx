import { useMemo } from "preact/hooks";
import { Board } from "./Board.jsx";
import { memo } from "../utils/memo.js";
import { generateBoards, validateBoardSettings } from "../model.js";

/** @type {import('preact').FunctionComponent<{ settings: Settings, rng?: () => number }>} */
export const Boards = memo(function Boards({ settings, rng }) {
	/** @type {Boards | undefined} */
	const boardData = useMemo(() => {
		let boardData;
		try {
			boardData = generateBoards(settings, rng);
		} catch (err) {}

		return boardData;
	}, [settings, rng]);

	const { warnings, errors } = useMemo(
		() => validateBoardSettings(settings),
		[settings],
	);

	if (errors.length > 0) {
		return (
			<div class="error">
				{warnings.map((warning, index) => (
					<p key={index}>{warning}</p>
				))}
				{errors.map((error, index) => (
					<p key={index}>{error}</p>
				))}
			</div>
		);
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

	return (
		<>
			{warnings.length > 0 && (
				<div class="warning">
					{warnings.map((warning, index) => (
						<p key={index}>{warning}</p>
					))}
				</div>
			)}
			<div class="boards">{boardJsx}</div>
		</>
	);
});
