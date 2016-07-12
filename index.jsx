require("./node_modules/bootstrap/dist/css/bootstrap.min.css")
import React from 'react';
import ReactDOM from 'react-dom';

export class App extends React.Component {
	render() {
		return (
			<div>
				<h1>Jumbotron</h1>
				<p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
				<p><a class="btn btn-primary btn-lg">Learn more</a></p>
			</div>
		);
	}
}

ReactDOM.render(<App/>, document.querySelector("#myApp"));
