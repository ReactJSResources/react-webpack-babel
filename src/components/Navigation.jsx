import React from 'react';
import {Link} from 'react-router-dom';

export default class Navigation extends React.Component {
	render() {
		return (
			<div>
				<ul>
					<li><Link to="/">Home</Link></li>
					<li><Link to="/about">About</Link></li>
					<li><Link to="/sample">Sample</Link></li>
				</ul>
			</div>
		)
	}
}

