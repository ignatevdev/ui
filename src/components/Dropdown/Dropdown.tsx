import React from 'react';
import ReactDOM from 'react-dom';

import {Placement} from 'popper.js';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {Manager, Reference, Popper, PopperChildrenProps} from 'react-popper';

import classNames from 'classnames';

import {getPrefix} from '../../utils';

export type DropdownOptions = PopperChildrenProps;

export interface DropdownProps {
  /** A reference element */
  children: React.ReactNode;

  /** A function to render content */
  renderContent: (options: DropdownOptions) => React.ReactNode;

  className?: string;

  opened: boolean;

  usePortal?: boolean;

  placement?: Placement;

  animationTimeout?: number;
}

interface PlacementListenerProps {
  placement?: Placement;

  children: React.ReactNode;

  onPlacement: (placement: Placement) => void;
}

const PlacementListener = ({
  placement,
  children,
  onPlacement
}: PlacementListenerProps): any => {
  React.useLayoutEffect(() => {
    if (placement) {
      onPlacement(placement);
    }
  }, [placement]);

  return children;
};

const Dropdown = (props: DropdownProps) => {
  const {
    children,
    placement,
    opened,
    usePortal,
    renderContent,
    animationTimeout,
    className
  } = props;

  const prefixCls = getPrefix('dropdown');

  // This state stores the calculated posiiton of a dummy dropdown
  const [preCalculatedPlacement, setPreCalculatedPlacement] = React.useState(
    null
  );

  /*
   * In order for position-based transitions to work,
   * we first render a dummy dropdown, save it's position,
   * and then render the <TransitionGroup /> with the position in place
   */
  const dropdown = (
    <TransitionGroup component={null}>
      {preCalculatedPlacement
        ? opened && (
            <CSSTransition
              timeout={animationTimeout}
              className={classNames(`${prefixCls}-content`, className)}
              classNames={`${prefixCls}-content`}
              onExited={() => setPreCalculatedPlacement(null)}
            >
              <Popper placement={placement}>
                {popperProps =>
                  renderContent({
                    ...popperProps,
                    // Fallback to pre-calculated position
                    placement: popperProps.placement || preCalculatedPlacement
                  })
                }
              </Popper>
            </CSSTransition>
          )
        : opened && (
            <Popper placement={placement}>
              {popperProps => {
                return (
                  <PlacementListener
                    placement={popperProps.placement}
                    onPlacement={setPreCalculatedPlacement}
                  >
                    {renderContent({
                      ...popperProps,
                      // Hide the dummy dropdown
                      style: {
                        ...popperProps.style,
                        visibility: 'hidden'
                      }
                    })}
                  </PlacementListener>
                );
              }}
            </Popper>
          )}
    </TransitionGroup>
  );

  const renderPortal = typeof window !== 'undefined' && usePortal;

  return (
    <Manager>
      <Reference>
        {({ref}) => (
          <div className={`${prefixCls}-reference`} ref={ref}>
            {children}
          </div>
        )}
      </Reference>

      {renderPortal ? ReactDOM.createPortal(dropdown, document.body) : dropdown}
    </Manager>
  );
};

Dropdown.defaultProps = {
  placement: 'bottom-start',
  animationTimeout: 0
};

export default Dropdown;
