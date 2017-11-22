import React from 'react';
import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom';
import App from './app';
import About from './components/About';
import Sample from './components/Sample';
import 'styles/index.scss';

export default class Routes extends React.Component {
	render() {
		return (
			<Router>
				<div>
					<Route exact path="/" component={App}/>
					<Route path="/about" component={About}/>
					<Route path="/sample" component={Sample}/>
				</div>
			</Router>
		)
	}
}
