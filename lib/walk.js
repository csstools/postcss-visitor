// tooling
const postcssSelector = require('postcss-selector-parser');
const postcssValue    = require('postcss-values-parser');

// css types
const declType = 'decl';
const ruleType = 'rule';

// selector and value keys
const selectorTypes = ['attribute', 'className', 'combinator', 'comment', 'id', 'nesting', 'pseudo', 'selector', 'selectors', 'string', 'tag', 'universal'];
const valueTypes    = ['atword', 'colon', 'comma', 'comment', 'func', 'number', 'operator', 'string', 'word', 'values'];

// selector and value constructors
const SelectorRoot = postcssSelector.root().constructor;
const ValueRoot = postcssValue('').parse().constructor;

// walk
const walk = module.exports = (node, result, visitors) => {
	// node type
	const type = node.constructor === SelectorRoot
		? 'selectors'
		: node.constructor === ValueRoot
			? 'values'
			: node.type;

	// conditionally visit node
	if (visitors[type]) {
		visitors[type](node, result);
	}

	// conditionally parse types
	if (
		type === ruleType &&
		selectorTypes.some(
			(selectorType) => visitors[selectorType]
		)
	) {
		// selector
		const selector = node.selector;

		// selectors (AST)
		const selectors = postcssSelector().process(selector).res;

		// assign selectors parent as rule
		selectors.parent = node;

		// walk selectors
		walk(selectors, result, visitors);

		// selectors stringified
		const selectorsToString = selectors.toString();

		// conditionally reassign selector
		if (selectorsToString !== selector) {
			node.selector = selectorsToString;
		}
	} else if (
		type === declType &&
		valueTypes.some(
			(valueType) => visitors[valueType]
		)
	) {
		// value
		const value = node.value;

		// values (AST)
		const values = postcssValue(value).parse();

		// assign values parent as declaration
		values.parent = node;

		// walk values
		walk(values, result, visitors);

		// values stringified
		const valuesToString = values.toString();

		// conditionally reassign value
		if (valuesToString !== value) {
			node.value = valuesToString;
		}
	}

	if (node.nodes) {
		// walk child nodes
		const childNodes = node.nodes.slice(0);
		const childNodesLength = childNodes.length;
		let childNodesIndex = -1;

		while (++childNodesIndex < childNodesLength) {
			walk(childNodes[childNodesIndex], result, visitors);
		}
	}
};

walk.parseSelector = (string) => postcssSelector().process(string).res;
walk.parseValue    = (string) => postcssValue(string).parse();
