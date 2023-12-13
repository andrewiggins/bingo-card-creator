import { useComputed } from "@preact/signals";
import { useState } from "preact/hooks";
import { settings, unsignalSettings } from "./model";
import { createSplitMix32 } from "./rng";
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
	const rng = createSplitMix32(seed);
	const next = () => rng.next();

	return (
		<>
			<h2>Preview</h2>
			<p>
				<button type="button" onClick={() => setSeed(newSeed())}>
					New preview boards
				</button>
			</p>
			<Boards settings={previewSettings.value} rng={next} />
		</>
	);
}
