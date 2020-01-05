import * as React from 'react';
import classNames from 'classnames';

export interface ButtonProps {
  children: React.ReactNode;

  className?: string;

  variant?: string;
}

const Button = ({children, className}: ButtonProps) => {
  return (
    <button
      type="button"
      className={classNames('ui-button-wrapper', className)}
    >
      {children}
    </button>
  );
};

export {Button};

export default Button;
