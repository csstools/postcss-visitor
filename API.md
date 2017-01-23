# PostCSS Visitor [<img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS Logo" width="90" height="90" align="right">][postcss]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Licensing][lic-img]][lic-url]
[![Changelog][log-img]][log-url]
[![Gitter Chat][git-img]][git-url]

## API

The [PostCSS Visitor] API allows you to create Visitor plugins. These plugins are backwards compatible with standard [PostCSS] plugins.

```js
const postcssv = require('postcss-visitor');

// create a visitor plugin
module.exports = postcssv.plugin(
	'postcss-visitor-example',
	(/* Options */) => ({
		decl(node) {
			// do something with a declaration
		}
	})
);
```

PostCSS Visitor also lets you use plain object visitors.

```js
require('postcss')([
	require('postcss-visitor')([
		// plain object visitors
		{
			decl(node) {
				// do something with a declaration
			}
		}
	])
]);
```

#### process()

```
process(css, pluginOptions, processOptions) → {Result}
```

Parses CSS and returns a Promise result, mirroring the PostCSS process method, which you can learn more about at [api.postcss.org](http://api.postcss.org/postcss.html).

##### create

```
create → { types }
```

A helper object for creating new PostCSS nodes.

- `create.root`: Creates a new [Root](http://api.postcss.org/Root.html) node.
- `create.atRule`: Creates a new [AtRule](http://api.postcss.org/AtRule.html) node.
- `create.rule`: Creates a new [Rule](http://api.postcss.org/Rule.html) node.
- `create.decl`: Creates a new [Decl](http://api.postcss.org/Decl.html) node.
- `create.comment`: Creates a new [Comment](http://api.postcss.org/Comment.html) node.

#### plugin()

```
plugin(name, initializer) → {PostCSS Plugin}
```

Returns a standard PostCSS plugin that may also be used with PostCSS Visitor using [asVisitor()](#plugin-asvisitor).

```js
require('postcss')([
	require('postcss-visitor-example-plugin')(/* Options */)
])
```

##### plugin().asVisitor()

```
asVisitor() → {Visitors}
```

Returns a list of Visitors that may be used with PostCSS Visitor.

```js
require('postcss')([
	// PostCSS Visitor plugins 
	require('postcss-visitor')([
		require('postcss-visitor-example-plugin').asVisitor(/* Options */)
	])
])
```

#### Visitors

```
{
	[type]: callback || { enter: callback, exit: callback }
}
```

A visitor is a **callback** assigned to a **type**. The **type** is the name of the node being visited in CSS, and the **callback** is the function (or `enter` and `exit` functions) executed whenever that node is encountered.

```js
{
	rule: (node, result) => {
		// do something with a rule before its children are visited
	}
}
```

```js
{
	rule: {
		enter: (node, result) => {
			// do something with a rule before its children are visited
		},
		exit: (node, result) => {
			// do something with a rule after its children are visited
		}
	}
}
```

When a visitor **callback** is run, it is given 2 parameters; `node` and `result`. A `node` is the specific node being visited, and a `result` is the Result of the PostCSS transformation, which you can learn more about at [api.postcss.org](http://api.postcss.org/Result.html).

You can read [VISITORS.md] to learn more about the nodes you can visit.

#### Result

The `result` in a [PostCSS Visitor] is bundled with additional functionality.

##### Result#visitors

```
visitors → {Visitors}
```

Returns the Visitors currently used by the [Result](#result).

##### Result#visit

```
visit(node)
```

Walks through the node and all of its descendants using the Visitors currently assigned to the [Result](#result).

##### Result#visitAsSelector

```
visitAsSelector(string, parent) → {String}
```

Parses the string as a selector, walks through all of its nodes using the Visitors currently assigned to the [Result](#result), and returns the stringified result.

##### Result#visitAsValue

```
visitAsValue(string, parent) → {String}
```

Parses the string as a value, walks through all of its nodes using the Visitors currently assigned to the [Result](#result), and returns the stringified result

[npm-url]: https://www.npmjs.com/package/postcss-visitor
[npm-img]: https://img.shields.io/npm/v/postcss-visitor.svg
[cli-url]: https://travis-ci.org/jonathantneal/postcss-visitor
[cli-img]: https://img.shields.io/travis/jonathantneal/postcss-visitor.svg
[lic-url]: LICENSE.md
[lic-img]: https://img.shields.io/npm/l/postcss-visitor.svg
[log-url]: CHANGELOG.md
[log-img]: https://img.shields.io/badge/changelog-md-blue.svg
[git-url]: https://gitter.im/postcss/postcss
[git-img]: https://img.shields.io/badge/chat-gitter-blue.svg

[API.md]: API.md
[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[PostCSS]: https://github.com/postcss/postcss
[PostCSS Visitor]: https://github.com/jonathantneal/postcss-visitor
[VISITORS.md]: VISITORS.md
