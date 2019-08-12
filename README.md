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
- `yarn build`
```json
	"scripts": {
		"build": "webpack",
		"test": "echo \"Error: no test specified\" && exit 1"
	},
```
- `production` mode (default) -> minimized bundle.js
- `development` mode -> more code but kind of readable


### Add `.gitignore`
```
node_modules
dist
```