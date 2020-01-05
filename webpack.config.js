module.exports = {
  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {enforce: 'pre', test: /\.js$/, loader: 'source-map-loader'}
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  }
};
