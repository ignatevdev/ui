import * as React from 'react';

import {ThemeProvider} from 'styled-components';

const variables = {};

const css = '.using-mouse :focus { outline: none; }';
const style = document.createElement('style');

document.head.appendChild(style);

style.type = 'text/css';
style.appendChild(document.createTextNode(css));

interface ThemeWrapperProps {
  children: React.ReactNode;
}

const ThemeWrapper: React.FC = ({children}: ThemeWrapperProps) => {
  React.useEffect(() => {
    document.addEventListener('DOMContentLoaded', () => {
      document.body.classList.remove('using-mouse');
    });

    document.body.addEventListener('mousedown', () => {
      document.body.classList.add('using-mouse');
    });

    document.body.addEventListener('keydown', () => {
      document.body.classList.remove('using-mouse');
    });
  });

  return <ThemeProvider theme={variables}>{children}</ThemeProvider>;
};

export default ThemeWrapper;
