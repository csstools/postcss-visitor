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
			const rawVisitorEnter = typeof rawVisitor === 'function' ? rawVisitor : rawVisitor.enter;
			const rawVisitorExit  = typeof rawVisitor === 'function' ? undefined : rawVisitor.exit;

			// visitor function (conditionally assigned)
			const visitor = visitors[key] || (visitors[key] = {
				enter: (node, result) => {
					const length = visitorCallbacks.length;
					let index = -1;
					let visitorFn;

					while (++index < length) {
						visitorFn = visitorCallbacks[index].enter;

						if (visitorFn) {
							visitorFn(node, result);
						}
					}
				},
				exit: (node, result) => {
					const length = visitorCallbacks.length;
					let index = -1;
					let visitorFn;

					while (++index < length) {
						visitorFn = visitorCallbacks[index].exit;

						if (visitorFn) {
							visitorFn(node, result);
						}
					}
				}
			});

			// visitor function keys (conditionally assigned)
			const visitorCallbacks = visitor.callbacks || (visitor.callbacks = []);

			// push raw visitor to visitor function keys
			visitorCallbacks.push({
				enter: rawVisitorEnter,
				exit:  rawVisitorExit
			});
		}
	}

	return visitors;
};
