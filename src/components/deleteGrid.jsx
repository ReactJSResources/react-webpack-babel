import React from 'react';
import * as firebase from 'firebase';
import styles from '../main.scss';

import {manageLogin} from '../util/login.js'

export default class DeleteGrid extends React.Component {
  constructor(){
    super();
    this.handleClick = this.handleClick.bind( this );
    this.deleteUserGrid = this.deleteUserGrid.bind( this );
  }

  handleClick(){
    manageLogin(this.deleteUserGrid);
  }

  deleteUserGrid(uid){
    this.gridRef = firebase.database().ref('grids/' + this.props.gridId
            + "/users/" + uid);
    this.userRef = firebase.database().ref('users/' + uid + '/grids/'
            + this.props.gridId);

    this.gridRef.remove();
    this.userRef.remove();
    this.props.gridRemoval(null);
  }

  render() {
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
    gridId: React.PropTypes.string,
    gridRemoval: React.PropTypes.func
}
