var path = require('path'),
    express = require('express'),
    webpack = require('webpack'),
    config = require('./webpack.config.development'),
    app = express(),
    compiler = webpack(config),
    wpOpts = {
      publicPath: config.output.publicPath,
      stats: {
        colors: true
      }
    };

app.use(require('webpack-dev-middleware')(compiler, wpOpts));
app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'app', 'hot-dev-app.html'));
});

app.listen(3000, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:3000');
});
