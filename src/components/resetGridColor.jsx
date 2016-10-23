import React from 'react';
import * as firebase from 'firebase';

export default class ResetGridColor extends React.Component {
  constructor(){
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick( event ){
    const gridRef = firebase.database().ref('grids/' + this.props.gridId + '/');

    const numRows = this.props.numRows;
    const numCols = this.props.numCols;

    for( let row = 0; row < numRows; row++){
      for( let col = 0; col < numCols; col++ ){
        let rowRef = 'r' + row;
        let colRef = 'c' + col;

        gridRef.child( rowRef ).child( colRef ).set( 'rgb(255, 255, 255)' );
      }
    } 
  }

  render(){
    return(
      <button className="button" className="btn btn-default" onClick={ this.handleClick }>Reset</button>
    )
  }
}