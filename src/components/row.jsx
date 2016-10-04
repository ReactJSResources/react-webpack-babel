import React from 'react';
import Cell from './cell.jsx';
import styles from '.././index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Row extends React.Component {
  render(){
    return(
      <div className={styles.matrixRow}>
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