import React from 'react';
import * as firebase from 'firebase';

import styles from '../main.scss';

export default class DeleteGrid extends React.Component {
  render(){
    return(
      <button type="button" className={ "btn btn-danger " + styles.button }>Delete Grid</button>
    );
  } 
}