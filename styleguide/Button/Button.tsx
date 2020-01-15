import * as React from 'react';

import {ButtonProps} from '../../src';

import {Wrapper, Loader, animationTimeout} from './styled';

const Button = (props: ButtonProps) => {
  const renderLoader = () => <Loader>Loading</Loader>;

  return (
    <Wrapper
      {...props}
      animationTimeout={animationTimeout}
      renderLoader={renderLoader}
    />
  );
};

export {Button};

export default Button as React.FC<ButtonProps>;
