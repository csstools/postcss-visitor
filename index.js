// tooling
const getVisitors = require('./lib/get-visitors');
const postcss     = require('postcss');
const walk        = require('./lib/walk');

// postcss-visitor → PostCSS plugin
module.exports = postcss.plugin(
	'postcss-visitor',
	(opts) => (root, result) => {
		// visitors
		const visitors = Array.isArray(opts)
			? getVisitors(opts, opts)
			: Object(opts) === opts && opts.plugins
				? getVisitors(opts.plugins, opts)
				: {};

		Object.assign(
			result,
			{
				// Result#visitors
				visitors: visitors,
				// Result#visit(node)
				visit: (node) => walk(node, result, visitors),
				// Result#visitAsSelector(string, parent)
				visitAsSelector: (string, parent) => {
					// selectors (AST)
					const selectors = walk.parseSelector().process(string).res;

					// assign parent
					selectors.parent = parent;

					// walk selectors
					walk(selectors, result, visitors);

					// selectors stringified
					const selectorsToString = selectors.toString();

					return selectorsToString
				},
				// Result#visitAsValue(string, parent)
				visitAsValue: (string, parent) => {
					// values (AST)
					const values = walk.parseValue(string).parse();

					// assign parent
					values.parent = parent;

					// walk values
					walk(values, result, visitors);

					// values stringified
					const valuesToString = values.toString();

					return valuesToString;
				}
			}
		);

		return walk(root, result, visitors);
	}
);

Object.assign(
	module.exports,
	{
		// postcss-visitor#create
		create: Object.assign(
			{},
			...['atRule', 'comment', 'decl', 'root', 'rule'].map(
				(key) => ({
					[key]: postcss[key]
				})
			)
		),
		// postcss-visitor#list
		list: postcss.list,
		// postcss-visitor#plugin
		plugin: (name, visitorsOrFn) => {
			// postcss plugin
			const plugin = postcss.plugin(
				name,
				(...args) => (root, result) => walk(
					root,
					result,
					asVisitor(...args)
				)
			);

			// visitor plugin
			const asVisitor = plugin.asVisitor = (...args) => {
				return typeof visitorsOrFn === 'function' ? visitorsOrFn(...args) : visitorsOrFn;
			};

			return plugin;
		},
		// postcss-visitor#process
		process: function (cssString, pluginOptions, processOptions) {
			return postcss([
				0 in arguments ? module.exports(pluginOptions) : module.exports()
			]).process(cssString, processOptions);
		}
	}
);
