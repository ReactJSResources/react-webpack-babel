import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { App }  from '../app';

configure({ adapter: new Adapter() });


describe('app', () => {
  it('renders <App /> components', () => {
    const component = shallow(<App />);
    expect(component).toMatchSnapshot();
  });
});
