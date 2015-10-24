# The Path - Success

## Install

Install dependencies.

```bash
$ npm install
```

## Run

```bash
npm run server
npm run start-dev
```

## Externals

Any 3rd party libraries which can't be built with webpack must be listed in `webpack.config.base.js`：

```javascript
externals: [
  // mysql, mongodb, and so on...
]
```

## CSS Modules support

Import css file as [css-modules](https://github.com/css-modules/css-modules) using `.module.css`.

## Package

```bash
npm run package
```

#### Options

- --name, -n: Application name (default: success)
- --version, -v: Electron version (default: latest version)
- --asar, -a: [asar](https://github.com/atom/asar) support (default: false)
- --icon, -i: Application icon
- --all: pack for all platforms
