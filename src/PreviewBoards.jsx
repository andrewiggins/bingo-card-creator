import { useComputed } from "@preact/signals";
import { useState } from "preact/hooks";
import { settings, unsignalSettings } from "./model";
import { createMulberry32 } from "./mulberry32";
import { Boards } from "./Boards";

const newSeed = () => Math.random() * 2 ** 32;

export function PreviewBoards() {
	const previewSettings = useComputed(() => ({
		...unsignalSettings(settings),
		count: 2,
	}));

	const [seed, setSeed] = useState(newSeed);

	// Recreate a new RNG each render with the same seed so we purposefully get the
	// same boards on each rerender. Only reseed the RNG when the user clicks the
	// "New preview boards" button.
	const mulberry32 = createMulberry32(seed);
	const rng = () => mulberry32.next();

	return (
		<>
			<h2>Preview</h2>
			<button type="button" onClick={() => setSeed(newSeed())}>
				New preview boards
			</button>
			<Boards settings={previewSettings.value} rng={rng} />
		</>
	);
}
