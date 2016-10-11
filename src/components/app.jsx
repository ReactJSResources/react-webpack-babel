import React from 'react';
import MatrixID from './data.jsx';
import Matrix from './matrix.jsx';
import Palette from './palette.jsx';
import styles from '../_base.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="col-sm-6">
            <Matrix/>
        </div>
        <div className="col-sm-6">
            <Palette/>
        </div>
      </div>
    )
  }
}
