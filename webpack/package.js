/* eslint no-shadow: 0, func-names: 0, no-unused-vars: 0, no-console: 0 */
var os = require('os'),
    webpack = require('webpack'),
    cfg = require('./webpack.config.production.js'),
    packager = require('electron-packager'),
    assign = require('object-assign'),
    del = require('del'),
    exec = require('child_process').exec,
    argv = require('minimist')(process.argv.slice(2)),
    devDeps = Object.keys(require('../package.json').devDependencies),
    appName = argv.name || argv.n || 'success',
    shouldUseAsar = argv.asar || argv.a || false,
    shouldBuildAll = argv.all || false;

var DEFAULT_OPTS = {
  dir: '../',
  name: appName,
  asar: shouldUseAsar,
  ignore: [
    '/test($|/)',
    '/release($|/)'
  ].concat(devDeps.map(function(name) { return '/node_modules/' + name + '($|/)'; }))
};

var icon = argv.icon || argv.i || 'app/app.icns';

if (icon) {
  DEFAULT_OPTS.icon = icon;
}

var version = argv.version || argv.v;

if (version) {
  DEFAULT_OPTS.version = version;
  startPack();
} else {
  // use the same version as the currently-installed electron-prebuilt
  exec('npm list | grep electron-prebuilt', function(err, stdout, stderr) {
    if (err) {
      DEFAULT_OPTS.version = '0.34.0';
    } else {
      DEFAULT_OPTS.version = stdout.split('@')[1].replace(/\s/g, '');
    }
    startPack();
  });
}

function startPack() {
  console.log('start pack...');
  webpack(cfg, function runWebpackBuild(err, stats) {
    if (err) return console.error(err);
    del('release').then(function(paths) {
      if (shouldBuildAll) {
        // build for all platforms
        var archs = ['ia32', 'x64'];
        ['linux', 'win32', 'darwin'].forEach(function(plat) {
          archs.forEach(function(arch) {
            pack(plat, arch, log(plat, arch));
          });
        });
      } else {
        // build for current platform only
        pack(os.platform(), os.arch(), log(os.platform(), os.arch()));
      }
    }).catch(console.error);
  });
}

function pack(plat, arch, cb) {
  // there is no darwin ia32 electron
  if (plat === 'darwin' && arch === 'ia32') return;
  var opts = assign({}, DEFAULT_OPTS, {
    platform: plat,
    arch: arch,
    out: 'release/' + plat + '-' + arch
  });
  packager(opts, cb);
}

function log(plat, arch) {
  return function(err, filepath) {
    if (err) return console.error(err);
    console.log(plat + '-' + arch + ' finished!');
  };
}
