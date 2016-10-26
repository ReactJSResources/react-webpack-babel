import React from 'react';
import NewGrid from './newGrid.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';

export default class NavBar extends React.Component {
  render(){
    return(
      <nav className="navbar navbar-dark bg-info">
        <a className="navbar-brand" href="#">React Color</a>
        <ul className="nav navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="#">Dashboard <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <NewGrid changeGrid={this.props.changeGrid}/>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Login</a>
          </li>
        </ul>
      </nav>
    );
  }
}
