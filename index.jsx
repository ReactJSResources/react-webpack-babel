require("./node_modules/bootstrap/dist/css/bootstrap.min.css")
import React from 'react';

export class App extends React.Component {
	render() {
		return (
        <div className="container">My simple <span className="badge">ad</span> React Babel Kut</div>
		);
	}
}

React.render(<App/>, document.querySelector("#myApp"));