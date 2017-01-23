# PostCSS Visitor [<img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS Logo" width="90" height="90" align="right">][postcss]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Licensing][lic-img]][lic-url]
[![Changelog][log-img]][log-url]
[![Gitter Chat][git-img]][git-url]

[PostCSS Visitor] lets you transform CSS with visitors. No more walking the CSS tree with every plugin.

```js
require('postcss-visitor').process(
	'figure { width: 100%; height: 100%; } ',
	[{
		decl(node) {
			if (node.prop === 'width') node.remove()
		}
	}]
).then(
	(result) => result.css // figure { height: 100%; }
)
```

[PostCSS Visitor] also lets you create [PostCSS] plugins that use visitors.

```js
// create a visitor plugin
module.exports = require('postcss-visitor').plugin(
	'postcss-visitor-example',
	(/* Options */) => ({
		decl(node) {
			// do something with a declaration
		}
	})
)
```

By default, visitor plugins still work with [PostCSS].

```js
require('postcss')([
	// use the visitor plugin as a postcss plugin
	require('postcss-visitor-example')(/* Options */)
])
```

The best practice is to use visitor plugins with [PostCSS Visitor]. These plugins will cooperate with each other and run much faster.

```js
require('postcss')([
	// use plugins as visitors
	require('postcss-visitor')([
		require('postcss-visitor-example').asVisitor(/* Options */),
		require('postcss-visitor-another-example').asVisitor(/* Options */),
		require('postcss-visitor-a-third-example').asVisitor(/* Options */)
	])
])
```

All [PostCSS Visitor] plugins run in the order of the tree first, and then the order they are added. This prevents many conflicts in standard [PostCSS] plugins and allows new kinds of plugins to be written.

## Options

If the options passed into [PostCSS Visitor] are an array, then the array will be used to load any plugins or transforms.

If the options are an object, then the `plugins` key will be used to load any plugins or transforms.

Plugins will be executed before walkin the DOM, and they will receive as an argument the options passed into [PostCSS Visitor].

## Visitors

Visitors are created by assigning functions to keys on an object. Anytime a node with a type matching that key is encountered, its function will be run.

Visitors may target constructs like at-rules, rules, and declarations, but they may also target more specific nodes, like a pseudo selector within a selector, or a function within a value.

Read [VISITORS.md] to learn more.

## API

The [PostCSS Visitor] API allows you to create visitor-based plugins that still work with [PostCSS] on their own.

Read [API.md] to learn more.

## Usage

Add [PostCSS Visitor] to your build tool:

```bash
npm install postcss-visitor --save-dev
```

#### Node

Use [PostCSS Visitor] to process your CSS:

```js
require('postcss-visitor').process(YOUR_CSS, /* options, plugins, visitors */)
```

#### PostCSS

Add [PostCSS] to your build tool:

```bash
npm install postcss --save-dev
```

Use [PostCSS Visitor] as a plugin:

```js
postcss([
	require('postcss-visitor')(/* options, plugins, visitors */)
]).process(YOUR_CSS, /* options */)
```

#### Gulp

Add [Gulp PostCSS] to your build tool:

```bash
npm install gulp-postcss --save-dev
```

Use [PostCSS Visitor] in your Gulpfile:

```js
var postcss = require('gulp-postcss')

gulp.task('css', function () {
	return gulp.src('./src/*.css').pipe(
		postcss([
			require('postcss-visitor')(/* options, plugins, visitors */)
		])
	).pipe(
		gulp.dest('.')
	)
})
```

#### Grunt

Add [Grunt PostCSS] to your build tool:

```bash
npm install grunt-postcss --save-dev
```

Use [PostCSS Visitor] in your Gruntfile:

```js
grunt.loadNpmTasks('grunt-postcss')

grunt.initConfig({
	postcss: {
		options: {
			use: [
				require('postcss-visitor')(/* options, plugins, visitors */)
			]
		},
		dist: {
			src: '*.css'
		}
	}
})
```

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

[`asVisitor()`]: API.md#pluginasvisitor
[API.md]: API.md
[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[PostCSS]: https://github.com/postcss/postcss
[PostCSS Visitor]: https://github.com/jonathantneal/postcss-visitor
[VISITORS.md]: VISITORS.md
