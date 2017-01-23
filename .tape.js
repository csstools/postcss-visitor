const postcssv = require('.');

module.exports = {
	'postcss-visitor': {
		'basic': {
			message: 'supports [ visitors ] usage',
			options: [
				{
					decl(node) {
						if (node.prop === 'some-property') {
							node.remove();
						}
					}
				}
			]
		},
		'basic:plugin': {
			message: 'supports [ postcss-visitor.plugin ] usage',
			options: [
				postcssv.plugin(
					'postcss-visitor-test',
					({ prop } = {}) => ({
						decl(node) {
							if (node.prop === prop) {
								node.remove();
							}
						}
					})
				).asVisitor({
					prop: 'some-property'
				})
			]
		},
		'basic:plugins': {
			message: 'supports { plugins: [ visitors ] } usage',
			options: {
				plugins: [
					{
						decl(node) {
							if (node.prop === 'some-property') {
								node.remove();
							}
						}
					}
				]
			}
		},
		'basic:plugins:plugin': {
			message: 'supports { plugins: [ postcss-visitor.plugin ] } usage',
			options: {
				plugins: [
					postcssv.plugin(
						'postcss-visitor-test',
						({ prop } = {}) => ({
							decl(node) {
								if (node.prop === prop) {
									node.remove();
								}
							}
						})
					).asVisitor({
						prop: 'some-property'
					})
				]
			}
		},
		'basic:plugins:plugin:opts': {
			message: 'supports { plugins: [ postcss-visitor.plugin, ...opts ] } usage',
			options: {
				plugins: [
					postcssv.plugin(
						'postcss-visitor-test',
						({ prop } = {}) => ({
							decl(node) {
								if (node.prop === prop) {
									node.remove();
								}
							}
						})
					)
				],
				prop: 'some-property'
			}
		}
	}
};
