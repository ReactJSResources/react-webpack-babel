import React from 'react';
import * as firebase from 'firebase';
import {matrixID} from './data.jsx';
import Matrix from './matrix.jsx';
export default class Randomize extends React.Component {
  constructor(){
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const gridId = this.props.gridId + '/';
    const rows = parseInt(this.props.numRows)
    const columns = parseInt(this.props.numCols);
    const cellsToChange = Math.floor(Math.random() * rows * columns);
    const colorStyleSheet = document.styleSheets[1].cssRules;

    for( var i = 0; i < cellsToChange; i++ ){
      let randomRow = 'r' + Math.floor(Math.random() * rows) + '/';
      let randomColumn = 'c' + Math.floor(Math.random() * columns) + '/';

      let colorIndex = Math.floor(Math.random() * colorStyleSheet.length);
      let randomColorStr = colorStyleSheet[colorIndex].cssText.toString();

      const cellRef = firebase.database().ref('grids/' + gridId + randomRow + randomColumn);

      let start = parseInt(randomColorStr.indexOf('color: '));
      let startlen = 'color: '.length;
      let end = parseInt(randomColorStr.indexOf(';'));

      let length = end - (start + startlen);
      let randomColor = '';
      let index;

      for( var k = 0; k < length; k++ ){
        index = start + startlen + k;
        randomColor = randomColor + randomColorStr.charAt(index);
      }

      cellRef.transaction(function() {
        return randomColor;
      });
    }
  }

  render() {
    return (
      <div>
        <button className="button" className="btn btn-default" onClick={this.handleClick}>Randomize</button>      
      </div>
    )
  }
}
