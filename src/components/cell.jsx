import styles from '.././index.scss';
import React from 'react';

export default class Cell extends React.Component {
  render() {
    return (
      <div>
        <div className={styles.cell}></div>
      </div>
    )
  }
  _handleClick() {
    console.log("clicked");
  }
}