// This is passed from the build command
const {NODE_ENV} = process.env;

const testsPattern = ['**/*.spec.ts', '**/*.spec.tsx'];

const config = {
  presets: ['@babel/preset-typescript'],
  plugins: [],
  ignore: ['/node_modules/']
};

switch (NODE_ENV) {
  case 'esm': {
    config.ignore.push(...testsPattern);

    break;
  }

  case 'cjs': {
    // Transform esm to cjs format
    config.plugins.push('@babel/plugin-transform-modules-commonjs');
    config.ignore.push(...testsPattern);

    break;
  }

  case 'test': {
    config.presets.push([
      '@babel/preset-env',
      {
        modules: 'commonjs'
      }
    ]);
    config.presets.push('@babel/preset-react');

    break;
  }

  default:
    break;
}

module.exports = config;
