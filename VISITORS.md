# PostCSS Visitor [<img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS Logo" width="90" height="90" align="right">][postcss]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Licensing][lic-img]][lic-url]
[![Changelog][log-img]][log-url]
[![Gitter Chat][git-img]][git-url]

## Visitors

A visitor is a **function** assigned to a **key**. The **key** is named after the node being visited in CSS, and the **function** is run whenever that node is encountered.

```js
postcssv([
	{
		decl: (node) => {
			// do something with a declaration
		},
		word: (node) => {
			// do something with a word
		}
	}
])
```

When a visitor **function** is run, it is given 2 parameters; `node` and `result`. `node` is the specific node being visited, and `result` is the Result of the PostCSS transformation, which you can learn more about at [api.postcss.org](http://api.postcss.org/Result.html).

## Visitable CSS Elements

#### atrule

An at-rule, like `@import` or `@media {}`. [[Documentation](http://api.postcss.org/AtRule.html)]

#### rule

A rule, like `div {}`. [[Documentation](http://api.postcss.org/Rule.html)]

#### decl

A declaration, like `display: block`. [[Documentation](http://api.postcss.org/Declaration.html)]

#### root

A collection of all the parts of a stylesheet. [[Documentation](http://api.postcss.org/Root.html)]

## Visitable Selector Elements

##### attribute

An attribute selector, like `[hidden]` or `[dir="rtl"]`. [[Documentation](https://github.com/postcss/postcss-selector-parser/blob/master/API.md#parserattributeprops)]

##### className

A class selector, like `.thing`. [[Documentation](https://github.com/postcss/postcss-selector-parser/blob/master/API.md#parserclassnameprops)]

##### combinator

A selector combinator, like `+` or `>`. [[Documentation](https://github.com/postcss/postcss-selector-parser/blob/master/API.md#parsercombinatorprops)]

##### comment

A comment, like `/* Hello there */`. [[Documentation](https://github.com/postcss/postcss-selector-parser/blob/master/API.md#parsercommentprops)]

##### id

Represents a ID selector, like `#thing`. [[Documentation](https://github.com/postcss/postcss-selector-parser/blob/master/API.md#parseridprops)]

##### nesting

A nesting selector, i.e. `&`. [[Documentation](https://github.com/postcss/postcss-selector-parser/blob/master/API.md#parseridprops)]

##### pseudo

A pseudo selector, like `::before`. [[Documentation](https://github.com/postcss/postcss-selector-parser/blob/master/API.md#parseridprops)]

##### selector

A selector, like `div#id.class` [[Documentation](https://github.com/postcss/postcss-selector-parser/blob/master/API.md#parserselectorprops)]

##### selectors

A collection of all the parts of a selector. [[Documentation](https://github.com/postcss/postcss-selector-parser/blob/master/API.md#parserrootprops)]

##### string

A string, like `"Hello there"`. [[Documentation](https://github.com/postcss/postcss-selector-parser/blob/master/API.md#parserstringprops)]

##### tag

Represents a tag selector, like `div`. [[Documentation](https://github.com/postcss/postcss-selector-parser/blob/master/API.md#parsertagprops)]

##### universal

A universal selector, i.e `*`. [[Documentation](https://github.com/postcss/postcss-selector-parser/blob/master/API.md#parseruniversalprops)]

## Visitable Value Elements

##### atword

An atword value, like `@foo`. [[Documentation](https://github.com/lesshint/postcss-values-parser/blob/master/API.md#parseratwordprops)]

##### colon

A colon, like `:`. [[Documentation](https://github.com/lesshint/postcss-values-parser/blob/master/API.md#parsercolonprops)]

##### comma

A comma, like `,`. [[Documentation](https://github.com/lesshint/postcss-values-parser/blob/master/API.md#parsercommaprops)]

##### comment

A comment, like `/* Hello there */`. [[Documentation](https://github.com/lesshint/postcss-values-parser/blob/master/API.md#parsercommentprops)]

##### func

A function, like `calc()` or `attr()`. [[Documentation](https://github.com/lesshint/postcss-values-parser/blob/master/API.md#parserfuncprops)]

##### number

A number, like `16px` or `1em`. [[Documentation](https://github.com/lesshint/postcss-values-parser/blob/master/API.md#parsernumberprops)]

##### operator

An operator, like `+` or `*`. [[Documentation](https://github.com/lesshint/postcss-values-parser/blob/master/API.md#parseroperatorprops)]

##### string

A string, like `"Hello there"`. [[Documentation](https://github.com/lesshint/postcss-values-parser/blob/master/API.md#parserstringprops)]

##### word

A word, like `initial` or `rebeccapurple`. [[Documentation](https://github.com/lesshint/postcss-values-parser/blob/master/API.md#parserwordprops)]

##### values

A collection of all the parts of a value. [[Documentation](https://github.com/lesshint/postcss-values-parser/blob/master/API.md#root-nodes)]

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
