# The Path - Success

## Install

Install dependencies.

```bash
$ npm install
```

## Run

```bash
npm run hot-server
npm run start-hot
```

## Externals

If you use any 3rd party libraries which can't be built with webpack, you must list them in your `webpack.config.base.js`：

```javascript
externals: [
  // put your node 3rd party libraries which can't be built with webpack here (mysql, mongodb, and so on..)
]
```

## CSS Modules support

Import css file as [css-modules](https://github.com/css-modules/css-modules) using `.module.css`.

## Package

```bash
npm run package
```

#### Options

- --name, -n: Application name (default: ElectronReact)
- --version, -v: Electron version (default: latest version)
- --asar, -a: [asar](https://github.com/atom/asar) support (default: false)
- --icon, -i: Application icon
- --all: pack for all platforms

Use `electron-packager` to pack your app with `--all` options for darwin (osx), linux and win32 (windows) platform. After build, you will find them in `release` folder. Otherwise, you will only find one for your os.

`test`, `tools`, `release` folder and devDependencies in `package.json` will be ignored by default.

#### Default Ignore modules

We ignore some modules' `peerDependencies` as default for application size reduction.

- `babel-core` is required by `babel-loader` and its size is ~19 MB
- `node-libs-browser` is required by `webpack` and its size is ~3MB.

> **Note:** If you want to use any above modules in runtime, for example: `require('babel/register')`, you should move them form `devDependencies` to `dependencies`.
