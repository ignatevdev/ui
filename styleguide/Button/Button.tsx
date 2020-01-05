import * as React from 'react';

import {ButtonProps} from '../../src';

import {Wrapper} from './styled';

const Button = (props: ButtonProps) => {
  return <Wrapper {...props} />;
};

export {Button};

export default Button;
