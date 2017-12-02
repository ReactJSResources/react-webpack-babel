import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import app from 'app';

configure({ adapter: new Adapter() });

describe('app', () => {
  it('renders without crashing', () => {
    mount(<app />);
  });
});
