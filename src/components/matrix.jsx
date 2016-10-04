import React from 'react';
import Row from './row.jsx';
import styles from '.././index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Matrix extends React.Component {
  render(){
    return(
      <div className={styles.matrix}>
        <Row/>
        <Row/>
        <Row/>
        <Row/>
        <Row/>
        <Row/>
      </div>
    )
  }
}