import React from 'react';
import MatrixID from './data.jsx';
import Matrix from './matrix.jsx';
import CustomMatrix from './customMatrix.jsx'
import styles from '../index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends React.Component {
  render() {
    return (
      <div className="container">
          <Matrix/>
          <CustomMatrix/>
      </div>
    )
  }
}
