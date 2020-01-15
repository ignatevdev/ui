import * as React from 'react';
import {shallow, mount} from 'enzyme';

import {Button} from './Button';

describe('<Button />', () => {
  it('renders children', () => {
    const content = 'Hello world';

    const button = shallow(<Button>{content}</Button>);

    expect(button.contains(content)).toBe(true);
  });

  it('becomes a custom component', () => {
    const Foo = (props: any) => <div {...props} />;

    const link = shallow(<Button component="a">I am a link</Button>);
    const fooButton = shallow(<Button component={Foo}>I am a div</Button>);

    expect(link.type()).toBe('a');
    expect(fooButton.type()).toBe(Foo);
  });

  it('forwards ref', () => {
    const ref: React.RefObject<HTMLButtonElement> = React.createRef();

    mount(<Button ref={ref}>Button with ref</Button>);

    expect(ref.current.type).toBe('button');
  });
});
