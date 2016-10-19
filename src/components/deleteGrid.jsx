import React from 'react';
import * as firebase from 'firebase';
import 'bootstrap/dist/css/bootstrap.min.css';

import {manageLogin} from '../util/login.js'

export default class DeleteGrid extends React.Component {
  constructor(){
    super();
    this.handleClick = this.handleClick.bind( this );
    this.deleteUserGrid = this.deleteUserGrid.bind( this );
  }

  handleClick( event ){
    manageLogin(this.deleteUserGrid);
  }

  deleteUserGrid( uid ){
    this.gridRef = firebase.database().ref('grids/' + this.props.gridId);
    this.userRef = firebase.database().ref('users/' + uid + '/grids');

    this.gridRef.remove();
    this.userRef.once( 'value', snapshot => {
        snapshot.forEach( grid => {
            if( grid.val() == this.props.gridId ){
                this.userRef.child( grid.key ).remove();
            }
        } );
    } );
  }

  render(){
    return(
      <button type="button"
            className="btn btn-danger"
            onClick={ this.handleClick }>
        Delete Grid
      </button>
    );
  } 
}

DeleteGrid.propTypes = {
    gridId: React.PropTypes.string
}