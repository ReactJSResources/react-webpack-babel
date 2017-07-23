import React from 'react';
import { mount } from 'enzyme';
import app from 'app';

describe('app', () => {
		it('renders without crashing', () => {
				mount(<app />);
		});
});
