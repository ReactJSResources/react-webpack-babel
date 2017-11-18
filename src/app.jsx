import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Sample from './components/Sample';
import 'styles/index.scss';

export default class App extends React.Component {
  render() {
    return (

				<Router>
					<div>
						<ul>
							<li><Link to="/">Home</Link></li>
							<li><Link to="/about">About</Link></li>
							<li><Link to="/sample">Sample</Link></li>
						</ul>

						<hr/>

						<Route exact path="/" component={Home}/>
						<Route path="/about" component={About}/>
						<Route path="/topics" component={Sample}/>
					</div>
				</Router>
    )
  }
}
