| Tool                | Description                    | Branch                                                                                               |
| ------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------- |
| Git                 | Version Control                | [Repo](#1); [Husky](#21); [Boilerplate](#25)                                                         |
| Webpack             | Bundler                        | [Mode](#5); [Server](#6); [Debugger](#7); [Analyzer](#12); [Externalize](#13)                        |
| Babel               | Transpiler                     | [React Class](#8); [Loader](#9); [Polyfill](#14)                                                     |
| React               | Component Web                  | [Hot Loading](#10); [Lazy Loading](#15); [Strict Mode](#22); [Error Boundary](#23); [propTypes](#24) |
| NPM                 | Node                           | [Git Repo Info](#1); [Scripts](#11)                                                                  |
| Test                | Test code                      | [Jest & Enzyme](#16)                                                                                 |
| Code Formatter      | Format code                    | [Prettier](#17)                                                                                      |
| Code Error Detector | Detect potential error of code | [ESLint](#18); [react-axe](#20)                                                                      |

<h3 id='1'>Intialize Project</h3>

- Create `react-webpack` folder

```sh
mkdir react-webpack && cd react-webpack
```

- Initialize `package.json`

```sh
npm init
```

- Initialize `.git`

```sh
git init
git add -A
git commit -m "init"
```

- Create `react-from-scratch` in `Github`

```sh
git remote add origin git@github.com:GeekEast/react-from-scratch.git
git push -u origin master
```

- Append `git` info to `package.json`

```sh
npm init -y
```

- Add `.gitignore`

```
node_modules
dist
```

<h3 id='2'>Webpack</h3>

- Install `yarn add --dev webpack webpack-cli`
- Modify `package.json`

```json
	"scripts": {
		"build": "webpack"
	},
```

- Webpack two modes：
  - `production` (default) -> minimized and optimize bundle.js `yarn build`
  - `development` mode -> more code but kind of readable if you want to debug (seldomly) `yarn build -- --mode development`
- config `webpack.config.js`

```javascript
// webpack.config.js
const path = require('path')
module.exports = {
  mode: 'production', // production or development
  entry: './src/index.js', // the entry point of the project
  output: {
    path: path.join(__dirname, 'dist'), // built file path
    filename: 'app.bundle.js' // built file name
  }
}
```

<h3 id='3'>Babel</h3>、

- Install `yarn add --dev @babel/core @babel/cli @babel/preset-env`
- Install `yarn add --dev babel-loader`
- Config  `webpack.config.js`
```js
const path = require('path')
module.exports = {
  mode: 'production',
  entry: './src/index.js', 
  output: {
    path: path.join(__dirname, 'dist'), 
    filename: 'app.bundle.js' 
  },
  // here
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env']
        }
      }
    ]
  }
}
```

<h3 id='4'>React</h3>

- Install `yarn add react react-dom prop-types`
- Babel Support `yarn add @babel/preset-react`
- Config `webpack.config.js`

```js
const path = require('path')
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react' // here
          ]
        }
      }
    ]
  }
}
```

- Install `yarn add --dev html-webpack-plugin`
  - It will generate the an entry html file in the dist folder.
  - The entry html file will automatically include the bundled js file.
  - `For react app, we need an entry html to plugin all the components.`
  - `One html entry point and one javascript, That's all for a React App, right?`
- create boilerplate of entry html

```html
<!-- src/index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React App</title>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```

- Modify `webpack.config.js`

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      }
    ]
  },
  // here
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}
```

- Webpack `Watch` Mode
  - watch mode: every time a file changes, the webpack will `rebuild`
  - very suitable for development mode
- Modify `package.json`

```json
// package.json
"scripts": {
	"build": "webpack",
	"dev":"webpack --watch --mode development",
}
```

<h3 id='5'>Webpack Config Branching</h3>

- Install `yarn add --dev webpack-merge`
- Rename `webpack.config.js` to `webpack.config.base.js`
- Create `webpack.config.prod.js` and `webpack.config.dev.js`
- Config `webpack.config.prod.js`

```javascript
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
module.exports = merge(baseConfig, {
  mode: 'development'
})
```

- Config `webpack.config.dev.js`

```javascript
// webpack.config.dev.js
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
module.exports = merge(baseConfig, {
  mode: 'development'
})
```

- Modify `package.json`

```json
	"scripts": {
		"build": "webpack --config webpack.config.prod.js",
		"dev": "webpack --watch --config webpack.config.dev.js",
	},
```

<h3 id='6'>Run React App in Local Server</h3>

- Eveytime you modify files, webpack will rebuild and the brower will be automatically refreshed
- Install `yarn add --dev webpack-dev-server`
- Modify `package.json`

```json
"scripts": {
  "build": "webpack --config webpack.config.prod.js",
   // here: --open
   "dev": "webpack-dev-server --open --configwebpack.config.dev.js"
},
```

- Modify `webpack.config.dev.js`

```javascript
module.exports = merge(baseConfig, {
  mode: 'development',
  // here
  devServer: {
    port: 9000
  }
})
```

<h3 id='7'>Debugger</h3>

- Debugger is a `break point`
- Add `debugger` in App.js

```javascript
// App.js
class App extends React.Component {
  render() {
    debugger // here
    return <h1>Hello world!!!</h1>
  }
}
```

- Modify `webpack.config.dev.js`

```javascript
module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    port: 9000
  },
  // here
  devtool: 'source-map'
})
```

- open browser -> inspect -> refesh App page -> check source code

<h3 id='8'>Syntax Support for React Class</h3>

- Install `yarn add --dev @babel/plugin-proposal-class-properties`
- Modify `webpack.config.base.js`

```javascript
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: [
            '@babel/plugin-proposal-class-properties', // here
          ]
        }
      },
```

<h3 id='9'>Loader for CSS</h3>

- Install `yarn add --dev style-loader css-loader`
- Modify `webpack.confg.base.js`

```javascript
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				options: {
					presets: [ '@babel/preset-env', '@babel/preset-react' ],
					plugins: [ '@babel/plugin-proposal-class-properties' ] // here
				}
			},
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ],
				exclude: /node-modules/
			}
		]
	},
```

<h3 id='10'>React Hot Loading</h3>

- Keep `state` when you modify code
- Install `yarn add react-hot-loader`
- Modify `webpack.config.dev.js`

```javascript
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				options: {
					presets: [ '@babel/preset-env', '@babel/preset-react' ],
					plugins: [ '@babel/plugin-proposal-class-properties', 'react-hot-loader/babel' ] // here
				}
			},
```

- Modify the `component` you want to use `react-hot-loader`

```javascript
// App.js
...
import { hot } from 'react-hot-loader';
class App extends React.Component {
 	...
}
export default hot(module)(App);
```

- Modify `package.json`

```json
	"scripts": {
		"build": "webpack --config webpack.config.prod.js",
		"dev": "webpack-dev-server --open --config webpack.config.dev.js",
		"dev:hot": "webpack-dev-server --open --hot --config webpack.config.dev.js" // here
	},
```

<h3 id='11'>Remove Duplicates in package.json</h3>

- Before

```json
	"scripts": {
		"build": "webpack --config webpack.config.prod.js",
		"dev": "webpack-dev-server --open --config webpack.config.dev.js",
		"dev:hot": "webpack-dev-server --open --hot --config webpack.config.dev.js",
		"test": "echo \"Error: no test specified\" && exit 1"
	},
```

- After

```json
	"scripts": {
		"build": "webpack --config webpack.config.prod.js",
		"dev": "webpack-dev-server --open --config webpack.config.dev.js",
		"dev:hot": "npm run dev -- --hot", // npm is better than yarn here
		"test": "echo \"Error: no test specified\" && exit 1"
	},
```

<h3 id='12'>Webpack Bundle Analyzer</h3>

- Install `yarn add --dev webpack-bundle-analyzer`
- Modify the `webpack.config.prod.js`

```javascript
const merge = require('webpack-merge')
// here
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, {
  mode: 'production',
  plugins: [
    // here
    new BundleAnalyzerPlugin({
      analyzerMode: 'static', // optional: generate a report html rather than starting a server
      openAnalyzer: false // optional: to generate report html wihtout opening it
      reportFilename: 'bundle_size.html' //optiona: the report name
    })
  ],
})
```

- `yarn build` -> will generate a report in `dist`

<h3 id='13'>Externalize in Webpack</h3>

- [React and ReactDOM CDN](https://zh-hans.reactjs.org/docs/cdn-links.html)
- Modify `webpack.config.prod.js`

```javascript
...
	// external means exclude sth out of the bundle.sj
	// in the following case, the app is blank because we eject the react and react-dom
	externals: {
		react: 'React',
		'react-dom': 'ReactDOM'
	}
});
```

- Modify src/index.html ([EJS](https://ejs.bootcss.com/))

```html
<body>
  <div id="app"></div>
  <% if(process.env.NODE_ENV === 'production') { %>
  <script
    crossorigin
    src="https://unpkg.com/react@16/umd/react.production.min.js"
  ></script>
  <script
    crossorigin
    src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"
  ></script>
  <% } %>
</body>
```

<h3 id='14'>Polyfill for Browsers</h3>

- Polyfill: provide something that browser cannot do
- Install `yarn add @babel/polyfill`
- Modify `index.js`

```javascript
import '@babel/polyfill'
```

- Polyfill will make the bundle file large significantly, need `selection` to slim bunlde file.
  `npx browserslist "last 2 versons, not dead, not < 2%"` (**market share**)
- Modify `webpack.config.base.js`

```javascript
...
module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				options: {
					presets: [
            // here
						[
							'@babel/preset-env',
							{
								targets: [ 'last 2 versions', 'not dead', 'not < 2%', 'not ie 11' ],
								userBuiltIns: 'entry'
							}
						],
            '@babel/preset-react'
            ...
```

<h3 id='15'>React Lazy Loading</h3>

- Import on use -> this will improve performance.
- Install `yarn add @babel/plugin-syntax-dynamic-import`
- Modify `webpack.config.base.js`

```javascript
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				options: {
					presets: [ '@babel/preset-env', '@babel/preset-react' ],
					plugins: [
						'@babel/plugin-proposal-class-properties',
						'react-hot-loader/babel',
						'@babel/plugin-syntax-dynamic-import' // here
					]
				}
			},
```

- Before

```javascript
// App.js
...
import Warning from './warning';
class App extends React.Component {
	state = {
		count: 0
	};
	render() {
		return (
			<div>
				...
				{this.state.count > 10 ? <Warning /> : null}
			</div>
		);
	}
}
...
```

- After

```javascript
// App.js
...
const Warning = React.lazy(() => import('./warning'));
class App extends React.Component {
	state = {
		count: 0
	};
	render() {
		return (
			<div>
				...
				{this.state.count > 10 ? (
					<React.Suspense fallback={null}>
						<Warning />
					</React.Suspense>
				) : null}
			</div>
		);
	}
}
...
```

<h3 id='16'>Jest Testing Library - Jest & Enzyme</h3>

- Install `yarn add --dev jest ts-jest jest-static-stubs identity-obj-proxy enzyme @types/enzyme enzyme-adapter-react-16 enzyme-to-json`
- Modify `package.json`

```json
  "scripts": {
    ...
    "test": "jest --passWithNoTests",
    ...
  },
  ...
  "jest": {
    "preset": "ts-jest",
    "roots": [
      "<rootDir>/src"
    ],
    "setupFiles": [
      "<rootDir>/enzyme.setup.ts"
    ],
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
    ],
    "snapshotSerializers": [
      "enzyme-to-json/serializer"
    ],
    "moduleNameMapper": {
      "^.+\\.(jpg|jpeg|gif|png|mp4|mkv|avi|webm|swf|wav|mid)$": "jest-static-stubs/$1",
      "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    }
  }
```

- Config `enzyme.setup.ts`

```javascript
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })
```

<h3 id='17'>Code Formatter: Prettier</h3>

- Install `yarn add --dev prettier pretty-quick`
- Modify `package.json`

```json
	"scripts": {
		"build": "webpack --config webpack.config.prod.js",
		"dev": "webpack-dev-server --open --config webpack.config.dev.js",
		"dev:hot": "npm run dev -- --hot",
		"test": "jest",
		"format": "pretty-quick"
	},
```

- Config `.prettierrc`

```json
{
  "tabWidth": 2,
  "semi": false,
  "singleQuote": true
}
```

- Config `.prettierignore`

```json
// .prettierrcignore
dist
package-lock.json
```

- Or you could use vs-code `prettier` (Easy)

<h3 id='18'>Code Industry Normalization: ESLint</h3>

- ESLint: hint `potential` error of code before actually running it.
- Install `yarn add --dev eslint eslint-plugin-react@latest`
- Modify `package.json`

```json
	"scripts": {
		"build": "webpack --config webpack.config.prod.js",
		"dev": "webpack-dev-server --open --config webpack.config.dev.js",
		"dev:hot": "npm run dev -- --hot",
		"test": "jest",
		"format": "pretty-quick",
		"lint": "eslint ./" // here
	},
```

- Initialize ESLint `./node_modules/.bin/eslint --init`
- Config `.eslintignore`

```json
dist
```

- Install `yarn add --dev babel-eslint`
- Modify `.eslintrc.json`

```json
{
    "parser": "babel-eslint", // point 1
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
        "jest": true // point 3
    },
    "settings": { // point 4
        "react": {
            "version": "16.9.0"
        }
    },
    "extends": ["eslint:recommended","plugin:react/recommended"], // point 2
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
   // don't add rules if you use prettier
...
```

- Then `yarn lint` will tell you some common errors -> trace the errors and fix them.

<h3 id='19'>Detect Accessibility Issues with ESLint</h3>

- Accessibility: for example, if you don't set alt key for `<img>`, it's not accessible
- Install `yarn add --dev eslint-plugin-jsx-a11y`
- Modify `.eslintrc.json`

```json
    "extends": ["eslint:recommended","plugin:react/recommended",
    "plugin:jsx-a11y/recommended"], // point 1
        "plugins": [
        "react",
        "jsx-a11y" // point 2
    ]
```

<h3 id='20'>Detect Accessibility Issues that ESLint can't detect</h3>

- Install `yarn add --dev react-axe`
- The detector will be shown in `chrome` console
- Modify `index.js`

```javascript
...
import DefaultsErrorBoundary from './DefaultsErrorBoundary';
if (process.env.NODE_ENV === 'development') {
	const axe = require('react-axe');
	// 1000 is 1s to check accessibility issue
	axe(React, ReactDOM, 1000);
}
...
```

<h3 id='21'>Husky: make commit good</h3>

- Install `yarn add --dev husky`
- Modify `package.json`

```json
	"husky": {
		"hooks": {
			"pre-commit": "pretty-quick --staged && npm run lint && npm run test" // only apply to git staged files
		}
	}
```

- When you run `git commit ...`
  - it will format the staged file
  - it will lint files
  - it will test files
    - if it fails, commit never happens
    - if it succeeds, commit succeeds.

<h3 id='22'>React Strict Mode</h3>

- Only useful in `development` mode rather than in `production` mode
- You want to check `method version` (deprecated) problems deep in the code tree -> use `<React.StrictMode/>`

```javascript
// index.js
...
ReactDOM.render(
  // or anywhere else
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('app')
)
```

<h3 id='23'>Error Boundary</h3>

- Case: Error not handled.
- Normally, nothing will be shown.
- But you want to show sth when there is a error
- Create `src/DefaultErrorBoundary`

```javascript
import React from 'react'
export default class DefaultErrorBoundary extends React.Component {
  state = {
    isError: false
  }

  static getDerivedStateFromError() {
    return { isError: true }
  }
  render() {
    const { isError } = this.state
    const { children } = this.props
    return isError ? <div>Something wrong</div> : children
  }
}
```

- Modify `index.js`

```javascript
ReactDOM.render(
  <React.StrictMode>
    <DefaultsErrorBoundary>
      <App />
    </DefaultsErrorBoundary>
  </React.StrictMode>,
  document.getElementById('app')
)
```

<h3 id='24'>Define propTypes for React</h3>

- lint: `'children' is missing in props validation`
- solution: define propTypes
- Install `yarn add prop-types`
- Modify `DefaultsErrorBoundary.js`

```javascript
...
import propTypes from 'prop-types';
  ...
	static propTypes = {
		children: propTypes.node.isRequired
  };
  ...
```

<h3 id='25'>Boilerplate to create React app</h3>

- **Step 1**: slim your configured React App to a boilerplate
- **Step 2**: git add && commit && push to the remote repo
- **Step 3**: `git clone --depth=1 git@... project_name` to clone the last commit of the remote repo
- **Step 4**: cd the project and `rm -rf .git`
- **Step 5**: intialize as your own project `git init`
- **Step 6**: go back to the `start` of this tutorial, you will know what to do next.

### Questions

#### What is `preset-env`

- preset-env includes a lot of latest javascript version, for example, es2015; es2016; es2107
- preset-react is especially for react code

#### How to run webpack manually?

`node_modules/.bin/webpack`

#### How to run babel manually

```sh
node_modules/.bin/babel ./src/greet.js --presets=@babel/preset-env
# or
$(npm bin)/babel ./src/greet.js --presets=@babel/preset-env
```

#### How to format code using prettier manually?

```sh
npx prettier --write "**/*.js"
```

#### What is loader in webpack?

- loader is sth that helps webpack to translate some kind of files.

#### Question: Why we need CDN of React and ReactDOM?

- need answer
