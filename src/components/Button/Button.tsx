import * as React from 'react';

import classNames from 'classnames';

import {TransitionGroup, CSSTransition} from 'react-transition-group';

import {getPrefix} from '../../utils';

type htmlTypes = 'button' | 'submit' | 'reset';

export interface ButtonProps {
  children: React.ReactNode;

  className?: string;

  disabled?: boolean;
  loading?: boolean;

  type?: htmlTypes;

  onClick?: (event: React.MouseEvent<HTMLElement>) => void;

  /** Useful for rendering custom spinners with transition group */
  renderLoader?: () => React.ReactNode;

  /** Useful to render some custom content before and after button text, e.g. icons */
  renderPrefix?: () => React.ReactNode;
  renderSuffix?: () => React.ReactNode;

  /** Loader transition timeout */
  animationTimeout?: number;

  /** Custom button component, e.g. 'a' for link button */
  component?: any;
}

const Button = React.forwardRef<any, ButtonProps>((props, ref?) => {
  const {
    children,
    className,
    disabled,
    loading,
    type = 'button',
    component,
    renderLoader,
    renderPrefix,
    renderSuffix,
    animationTimeout,
    onClick,
    ...rest
  } = props;

  const prefixCls = getPrefix('button');

  const classes = classNames(prefixCls, className, {
    [`${prefixCls}-disabled`]: disabled,
    [`${prefixCls}-loading`]: loading
  });

  const Component = component || 'button';

  return (
    <Component
      type={type}
      className={classes}
      onClick={onClick}
      ref={ref}
      {...rest}
    >
      {renderPrefix && renderPrefix()}

      {children}

      {renderSuffix && renderSuffix()}

      {renderLoader && (
        <TransitionGroup component={null}>
          {loading && (
            <CSSTransition
              timeout={animationTimeout}
              className={`${prefixCls}-loader`}
              classNames={`${prefixCls}-loader`}
              unmountOnExit
              in={loading}
            >
              {renderLoader()}
            </CSSTransition>
          )}
        </TransitionGroup>
      )}
    </Component>
  );
});

export {Button};

export default Button;
