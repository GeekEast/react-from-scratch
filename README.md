### Create Project

```sh
mkdir react-webpack && cd react-webpack
```

### Init Project

```sh
npm init
```

### Create Git Repo

```sh
git add -A
git commit -m "init"
# go to github and create the react-from-scratch report
git remote add origin git@github.com:GeekEast/react-from-scratch.git
git push -u origin master
```

### Add git info to `package.json`

```sh
npm init -y
```

### Install Webpack

```sh
yarn add --dev webpack webpack-cli
```

### Build Project

- manually

```sh
node_modules/.bin/webpack
```

- using `yarn` or `npm`

```json
	"scripts": {
		"build": "webpack",
		"test": "echo \"Error: no test specified\" && exit 1"
	},
```

- `production` (default) -> minimized and optimize bundle.js
  - `yarn build`
- `development` mode -> more code but kind of readable if you want to debug (seldomly)
  - `yarn build -- --mode development`

### Add `.gitignore`

```
node_modules
dist
```

### Custom Webpack Configs

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

### Install Babel

```sh
yarn add --dev @babel/core @babel/cli @babel/preset-env
```

### Run Babel

- manually

```sh
node_modules/.bin/babel ./src/greet.js --presets=@babel/preset-env
# or
$(npm bin)/babel ./src/greet.js --presets=@babel/preset-env
```

### Add babel to webpack

- install loader
  - loader is sth that helps webpack to translate some kind of files.

```sh
yarn add --dev babel-loader
```

```js
// webpack.config.js
const path = require('path')
module.exports = {
  mode: 'production', // production or development
  entry: './src/index.js', // the entry point of the project
  output: {
    path: path.join(__dirname, 'dist'), // built file path
    filename: 'app.bundle.js' // built file name
  },
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

### Add React

```sh
yarn add react react-dom prop-types
```

```sh
yarn add @babel/preset-react
```

```js
// webpack.config.js
const path = require('path')
module.exports = {
  mode: 'production', // production or development
  entry: './src/index.js', // the entry point of the project
  output: {
    path: path.join(__dirname, 'dist'), // built file path
    filename: 'app.bundle.js' // built file name
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
  }
}
```

### html-webpack-plugin

- It will generate the an entry html file in the dist folder.
- THe entry html file will automatically include the bundled js file.
- For react app, we need an entry html to plugin all the components.
- **One html entry point and one javascript, That's all for a React App, right?**

```sh
yarn add --dev html-webpack-plugin
```

#### create boilerplate

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

#### webpack config

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'production', // production or development
  entry: './src/index.js', // the entry point of the project
  output: {
    path: path.join(__dirname, 'dist'), // built file path
    filename: 'app.bundle.js' // built file name
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'] // type of js version to recognise
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}
```

### Webpack Watch Mode

- watch mode: every time a file changes, the webpack will rebuild
- very suitable for development mode

```json
// package.json
"scripts": {
	"build": "webpack",
	"dev":"webpack --watch --mode development",
}
```

### Seperate Prod and Dev for Webpack Config

- Install `webpack-merge`

```sh
yarn add --dev web-merge
```

- rename `webpack.config.js` to `webpack.config.base.js`
- create `webpack.config.prod.js` and `webpack.config.dev.js`

```javascript
// webpack.config.prod.js
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
module.exports = merge(baseConfig, {
  mode: 'development'
})

// webpack.config.dev.js
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
module.exports = merge(baseConfig, {
  mode: 'development'
})
```

- modify `package.json`

```json
	"scripts": {
		"build": "webpack --config webpack.config.prod.js",
		"dev": "webpack --watch --config webpack.config.dev.js",
		"test": "echo \"Error: no test specified\" && exit 1"
	},
```

### Run React App in Watch Mode

- Eveytime you modify files, webpack will rebuild and the brower will be automatically refreshed
- Install ``webpack-dev-server`

```sh
yarn add --dev webpack-dev-server
```

- Modify `package.json`

```json
	"scripts": {
		"build": "webpack --config webpack.config.prod.js",
		"dev": "webpack-dev-server --open --config webpack.config.dev.js",
		"test": "echo \"Error: no test specified\" && exit 1"
	},
```

- Custom dev server port, modify `webpack.config.dev.js`

```javascript
module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    port: 9000
  }
})
```

### Debugger

- add `debugger` as a break point

```javascript
// App.js
class App extends React.Component {
  render() {
    debugger
    return <h1>Hello world!!!</h1>
  }
}
```

- add `dev-tool` in `webpack.config.dev.js`

```javascript
module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    port: 9000
  },
  devtool: 'source-map'
})
```

- open browser -> inspect -> refesh App page -> check source code

### Add syntax support for react class

- Install `@babel/plugin-proposal-class-properties`

```sh
yarn add --dev @babel/plugin-proposal-class-properties
```

- Modify `webpack.config.base.js`

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
			}
		]
	},
```

### Loader for CSS

- Install `css-loader`

```sh
# style loader is for syntax
# css loader is for inject css to html
yarn add --dev css-loader style-loader
```

- Modify `webpack.confg.base.js`

```javascript
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				options: {
					presets: [ '@babel/preset-env', '@babel/preset-react' ], // type of js version to recognise
					plugins: [ '@babel/plugin-proposal-class-properties' ]
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

### Code Change without reseting state

- you want to keep current page's state even you have modify some code. In the following case, if you change the color in css, the page will be `refreshed`, and the state of `count` was lost.

```css
.warning {
  color: blue;
}
```

```javascript
// App.js
class App extends React.Component {
  state = {
    count: 0
  }
  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <h2 className={this.state.count > 10 ? 'warning' : null}>
          Count: {this.state.count}
        </h2>
        <button
          onClick={() => this.setState(state => ({ count: state.count + 1 }))}
        >
          +
        </button>
        <button
          onClick={() => this.setState(state => ({ count: state.count - 1 }))}
        >
          -
        </button>
      </div>
    )
  }
}
```

- Install `react-hot-loader`

```sh
yarn add react-hot-loader
```

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

- Modify the `component` file you want to use `react-hot-loader`

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
		"dev:hot": "webpack-dev-server --open --hot --config webpack.config.dev.js",
		"test": "echo \"Error: no test specified\" && exit 1"
	},
```

- So when you modify the code (**not refesh the page!**), the state of that page will be kept by `hot-loader`

### Avoid Duplicate Scripts in `package.json`

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

### Analyse the bundles

- Install `webpack-bundle-analyzer`

```sh
yarn add --dev webpack-bundle-analyzer
```

- modify the `webpack.config.prod.js`

```javascript
const merge = require('webpack-merge')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, {
  mode: 'production',
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static', // optional: generate a report html rather than starting a server
      openAnalyzer: false // optional: to generate report html wihtout opening it
    })
  ]
})
```

- run build `yarn build` -> will start a server

### Add CDN to Webpack

- **Question: Why we need CDN of React and ReactDOM?**
- [use React and ReactDOM via CDN](https://zh-hans.reactjs.org/docs/cdn-links.html)
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

### Add Syntax for [Browsers](https://www.cnblogs.com/chyingp/p/understanding-babel-polyfill.html)

- `polyfill`: provide something that browser cannot do
- Install `@babel/polyfill`

```sh
yarn add  @babel/polyfill
```

- Modify `index.js`

```javascript
// import React from 'react';
// import ReactDOM from 'react-dom';
import '@babel/polyfill'
// import App from './App';
// import './styles.css';
// ReactDOM.render(<App />, document.getElementById('app'));
```

- This will add large to the bundle file, which will affect the performance
  - If you know what browser users are going to user, you should try to avoid polyfill

### Asynchronously Load Component (Lazy Loading)

- no use, no import; `import on use`, this will improve performance.
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

### Jest

- Install `jest` `yarn add --dev jest`
- modify `package.json`

```json
	"scripts": {
		"build": "webpack --config webpack.config.prod.js",
		"dev": "webpack-dev-server --open --config webpack.config.dev.js",
		"dev:hot": "npm run dev -- --hot",
		"test": "jest" // here
	},
```

- create test file src/App.test.js

```javascript
describe('App', () => {
  it('runs and passes', () => {
    expect(true).toBe(true)
  })
})
```

### Code Auto-formatting

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

- Custom Configuration: add `.prettierrc .prettierignore`

```json
// .prettierrc
{
  "tabWidth": 2,
  "semi": false,
  "singleQuote": true
}
```

- Format manually `npx prettier --write "**/*.js"`
- But we don't want to format `dist/*.js`

```json
// .prettierrcignore
dist
package-lock.json
```

- Or you could use vs-code `prettier` (**Easy**)

### Code Error Detector

- ESLint: hint common error of code before actually running it.
- Install `yarn add --dev eslint eslint-plugin-react`
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

- Config ESLint `./node_modules/.bin/eslint --init`

```json
{
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "extends": "eslint:recommended",
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": ["react"]
  // there are fommatting configs, we use prettier, so just comment it.
  // "rules": {
  //     "indent": [
  //         "error",
  //         4
  //     ],
  //     "linebreak-style": [
  //         "error",
  //         "unix"
  //     ],
  //     "quotes": [
  //         "error",
  //         "single"
  //     ],
  //     "semi": [
  //         "error",
  //         "never"
  //     ]
  // }
}
```

- Config `.eslintignore`

```json
dist
```

- Install `yarn add --dev babel-eslint`
- modify `.eslintrc.json`

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
...
```

- Then `yarn lint` will tell you some common errors -> trace the errors and fix them.

### Eslint for accessibility issues detect

- Accessibility: for example, if you don't set alt key for `<img>`, it's not accessible
- Install `yarn add --dev eslint-plugin-jsx-a11y`
- config `.eslintrc.json`

```json
    "extends": ["eslint:recommended","plugin:react/recommended",
    "plugin:jsx-a11y/recommended"], // point 1
        "plugins": [
        "react",
        "jsx-a11y" // point 2
    ]
```

### Avoid Bad Commit & Push - Husky

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

### Points

- preset-env includes a lot of latest javascript version, for example, es2015; es2016; es2107
- preset-react is especially for react code
