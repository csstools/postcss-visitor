// return visitors
module.exports = (plugins, opts) => {
	// visitors list
	const visitors = {};

	// walk raw visitors list
	let rawIndex = -1;
	let plugin;

	while (plugin = plugins[++rawIndex]) {
		// walk raw visitors by keys
		let key;

		// execute plugin functions
		if (typeof plugin === 'function' && typeof plugin.asVisitor === 'function') {
			plugin = plugin.asVisitor(opts);
		}

		for (key in plugin) {
			const rawVisitor = plugin[key];

			// visitor function (conditionally assigned)
			const visitor = visitors[key] || (visitors[key] = (node, result) => {
				let index = -1;
				let visitorFn;

				while (visitorFn = visitorKeys[++index]) {
					visitorFn(node, result);
				}
			});

			// visitor function keys (conditionally assigned)
			const visitorKeys = visitor.keys || (visitor.keys = []);

			// push raw visitor to visitor function keys
			visitorKeys.push(rawVisitor);
		}
	}

	return visitors;
};
