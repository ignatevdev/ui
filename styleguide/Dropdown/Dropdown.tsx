import * as React from 'react';

import {PopperChildrenProps} from 'react-popper';

import {DropdownProps} from '../../src';

import {DropdownComponent, Wrapper, Content, animationTimeout} from './styled';

interface Props extends DropdownProps {
  renderContent: () => React.ReactNode;
}

interface DropdownContentProps extends PopperChildrenProps {
  renderContent: () => React.ReactNode;
}

const Dropdown = (props: Props) => {
  const {children, renderContent, ...rest} = props;

  return (
    <DropdownComponent
      renderContent={dropdownProps => {
        const {style, placement, ref} = dropdownProps;

        return (
          <Wrapper ref={ref} style={style} data-placement={placement}>
            <Content>{renderContent()}</Content>
          </Wrapper>
        );
      }}
      animationTimeout={animationTimeout}
      {...rest}
    >
      {children}
    </DropdownComponent>
  );
};

export {Dropdown};

export default Dropdown as React.FC<DropdownProps>;
