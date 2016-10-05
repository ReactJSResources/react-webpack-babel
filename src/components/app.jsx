import React from 'react';
import Matrix from './matrix.jsx';
import Palette from './palette.jsx';
import styles from '../index.scss';
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