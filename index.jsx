require("./node_modules/bootstrap/dist/css/bootstrap.min.css")
import React from 'react';

export class App extends React.Component {
	render() {
		return (
        <div>Simaple React + Babel + Bootstrap + Webpack </div>
		);
	}
}

React.render(<App/>, document.querySelector("#myApp"));