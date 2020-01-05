import * as React from 'react';
import {shallow} from 'enzyme';

import {Button} from './Button';

describe('<Button />', () => {
  it('renders children', () => {
    const content = 'Hello world';

    const wrapper = shallow(<Button>{content}</Button>);

    expect(wrapper.contains(content)).toBe(true);
  });
});
