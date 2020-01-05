/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */

const path = require('path');

const webpackConfig = require('./webpack.config.js');

module.exports = {
  // We don't need styled components to be shown
  ignore: ['**/styled.tsx'],
  styleguideComponents: {
    // Context providers and global hooks
    Wrapper: path.join(__dirname, 'styleguide/Wrapper')
  },
  components: ['./src/**/*.tsx', './styleguide/**/*.tsx'],
  // Only show components with stories
  skipComponentsWithoutExample: true,
  webpackConfig,

  // Apply custom font
  template: {
    head: {
      links: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Open+Sans:400,600,700'
        }
      ]
    }
  },
  styles: {
    Playground: {
      root: {
        'font-family': '"Open Sans", arial'
      }
    }
  },
  theme: {
    fontFamily: {
      base: '"Open Sans", arial'
    }
  },

  // Required for component props to be documented
  propsParser: require('react-docgen-typescript').withDefaultConfig().parse,
  resolver: require('react-docgen').resolver.findAllComponentDefinitions,

  // Build output directory
  styleguideDir: 'docs'
};
