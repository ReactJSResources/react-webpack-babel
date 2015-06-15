import React from 'react';

export class App extends React.Component {
	render() {
		return (
			<div>My simple React Webpack Babel App</div>
		);
	}
}

React.render(<App/>, document.querySelector("#myApp"));