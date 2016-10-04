import React from 'react';
import Cell from './cell.jsx';
import styles from '.././index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Column extends React.Component {
  render(){
    return(
      <div className={styles.matrixColumn}>
        <Cell/>
        <Cell/>
        <Cell/>
        <Cell/>
        <Cell/>
        <Cell/>
      </div>
    )
  }
}