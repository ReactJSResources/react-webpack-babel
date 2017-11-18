import React from 'react';
import Navigation from './components/Navigation';

export default class App extends React.Component {
	render() {
		return (
			<div className='App'>
				<Navigation/>
				<div className='Page'>
					{ this.props.children }
				</div>
			</div>
		)
	}
}

