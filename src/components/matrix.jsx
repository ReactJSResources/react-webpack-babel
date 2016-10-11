import React from 'react';
import Cell from './cell.jsx';
import styles from '.././index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {matrixID} from './data.jsx';
export default class Matrix extends React.Component {
  render(){
    let matrix = []
    for(var i=0; i<matrixID[0];i++){
      let column = []
      for(var j=0;j<matrixID[1];j++){
        column.push(<Cell id={"R"+i + "C" + j}/>)
      }
      matrix.push(<div className={styles.matrixColumn}>{column}</div>)
    }
  return(<div className={styles.matrix}>{matrix}</div>)
  }
}
