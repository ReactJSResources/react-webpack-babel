import React from 'react';
import Cell from './cell.jsx';
import styles from '.././index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {matrixID} from './data.jsx'

export default class Column extends React.Component {
  render(){
    var matrix = []
    for(var i=0;i<matrixID[1];i++){
      matrix.push(<Cell/>)
    }
    return(
      <div className={styles.matrixColumn}>{matrix}</div>
    )
  }
}
