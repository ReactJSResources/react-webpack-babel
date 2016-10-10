import React from 'react';
import Column from './row.jsx';
import styles from '.././index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {matrixID} from './data.jsx';
export default class Matrix extends React.Component {
  render(){
    var matrix = []
    for(var i=0; i<matrixID[0];i++){
        matrix.push(<Column/>)
    }
  return(<div className={styles.matrix}>{matrix}</div>)
  }
}
