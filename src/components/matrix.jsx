import React from 'react';
import Column from './row.jsx';
import styles from '.././index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Matrix extends React.Component {
  render(){
    return(
      <div className={styles.matrix}>
        <Column/>
        <Column/>
        <Column/>
        <Column/>
        <Column/>
        <Column/>
      </div>
    )
  }
}