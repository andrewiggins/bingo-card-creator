import { useLayoutEffect, useRef } from "preact/hooks";

/** @type {Map<string, Record<number, string>>} */
const cache = new Map();

/** @type {(text: string, maxLines: number) => string | undefined} */
function readCache(text, maxLines) {
	return cache.get(text)?.[maxLines];
}

/** @type {(text: string, maxLines: number) => [ref: preact.RefObject<HTMLElement>, fontSize: string | undefined]} */
export function useResizeText(text, maxLines) {
	/** @type {preact.RefObject<HTMLElement> | null} */
	const ref = useRef(null);
	useLayoutEffect(() => {
		if (!ref.current) return;
		const span = ref.current;

		// TODO: Batch writes if possible

		const computedStyle = window.getComputedStyle(span);
		const initialFontSize = computedStyle.fontSize;
		let cachedFontSize = cache.get(text)?.[maxLines];
		if (cachedFontSize) {
			if (cachedFontSize !== initialFontSize) {
				// console.log("cache incorrect", text, cachedFontSize, initialFontSize);
				span.style.fontSize = cachedFontSize;
			}

			return;
		}

		// console.log("cache miss", text, maxLines, cache.get(text));

		const rawLineHeight = computedStyle.lineHeight;
		let lineHeight = 0.0;
		if (rawLineHeight === "normal") {
			lineHeight = 1.15625;
		} else if (rawLineHeight.match(/[^0-9.]$/)) {
			throw new Error(`lineHeight must be a number. Got ${lineHeight}`);
		} else {
			lineHeight = parseFloat(rawLineHeight);
		}

		const maxHeight = maxLines * lineHeight * parseFloat(initialFontSize);
		const minFontSize = 10;

		let fontSize = parseFloat(initialFontSize);
		while (
			span.getBoundingClientRect().height > maxHeight &&
			fontSize > minFontSize
		) {
			fontSize--;
			span.style.fontSize = `${fontSize}px`;
		}

		const textCache = cache.get(text) ?? {};
		textCache[maxLines] = `${fontSize}px`;
		cache.set(text, textCache);
	}, [text, maxLines]);

	return [ref, readCache(text, maxLines)];
}
