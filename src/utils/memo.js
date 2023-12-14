import { createElement } from "preact";

/** @type {(a: any, b: any) => boolean} */
function shallowDiffers(a, b) {
	for (let i in a) if (i !== "__source" && !(i in b)) return true;
	for (let i in b) if (i !== "__source" && a[i] !== b[i]) return true;
	return false;
}

/**
 * Memoize a component, so that it only updates when the props actually have
 * changed. This was previously known as `React.pure`.
 * @template T
 * @param {import('preact').FunctionComponent<T>} c functional component
 * @param {(prev: T, next: T) => boolean} [comparer] Custom equality function
 * @returns {import('preact').FunctionComponent<T>}
 */
export function memo(c, comparer) {
	/**
	 * @this {import('preact').Component}
	 * @type {(nextProps: any) => boolean}
	 */
	function shouldUpdate(nextProps) {
		let ref = this.props.ref;
		let updateRef = ref == nextProps.ref;
		if (!updateRef && ref) {
			ref.call ? ref(null) : (ref.current = null);
		}

		if (!comparer) {
			return shallowDiffers(this.props, nextProps);
		}

		return !comparer(this.props, nextProps) || !updateRef;
	}

	/** @type {(props: any) => any} */
	function Memoed(props) {
		this.shouldComponentUpdate = shouldUpdate;
		return createElement(c, props);
	}
	Memoed.displayName = "Memo(" + (c.displayName || c.name) + ")";
	Memoed.prototype.isReactComponent = true;
	// Memoed._forwarded = true; // TODO: add if needed
	return Memoed;
}
