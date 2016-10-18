import React from 'react';
import * as firebase from 'firebase';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class DeleteGrid extends React.Component {
  constructor(){
    super();
    this.handleClick = this.handleClick.bind( this );
  }

  handleClick( event ){
    this.gridRef = firebase.database().ref('grids/' + this.props.gridID);
    // this.gridRef.remove();
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