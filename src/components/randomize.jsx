import React from 'react';
import * as firebase from 'firebase';
import {matrixID} from './data.jsx';
import Matrix from './matrix.jsx';
//import variables from './../_variables.scss';

export default class Randomize extends React.Component {
  constructor(){
    super();
    this.handleClick = this.handleClick.bind(this);

  }

  handleClick(gridId) {

    var gridId = this.props.gridId + '/';
    var rows = matrixID[0];
    var columns = matrixID[1];
    var cellsToChange = Math.floor(Math.random()*rows*columns);
    const colorStyleSheet = document.styleSheets[0].cssRules;

    console.log(colorStyleSheet);


    for(var i=0; i<cellsToChange; i++)
    {
    var randomRow = 'r' + Math.floor(Math.random() * rows) + '/';
    var randomColumn = 'c' + Math.floor(Math.random() * columns) + '/';
    var cellRef = firebase.database().ref('grids/'+gridId + randomRow + randomColumn);
    var colorIndex = Math.floor(Math.random() * 5);
    var randomColorStr = colorStyleSheet[colorIndex].cssText.toString();
    var start = parseInt(randomColorStr.indexOf('color: '));
    var startlen = 'color: '.length;
    var end = parseInt(randomColorStr.indexOf(';'));
    var randomColor = '';
    var length = end - (start+startlen);
    console.log(randomColorStr.charAt(start));
    console.log(randomColorStr.charAt(start+1));
    console.log(randomColorStr.charAt(start+2));
    console.log(randomColorStr.charAt(start+3));
    var index=0;

    console.log(randomColorStr);
    for (var k=0; k<length; k++){
      index = start+startlen+k;
      randomColor = randomColor + randomColorStr.charAt(index);  
    
    }
    console.log("RGB Random is " + randomColor);
    // change cell color
    cellRef.transaction(function() {
        return randomColor;
      });
    }
  }

  render() {
    return (
      <div>
        <button className="button" onClick={this.handleClick}>Randomize</button>      
      </div>
    )
  }
}