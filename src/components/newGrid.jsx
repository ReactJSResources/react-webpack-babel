import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as firebase from 'firebase';
import {manageLogin} from '../util/login.js'

export default class NewGrid extends React.Component {
  constructor(){
    super();
    this.state = {numRows: '',numCols: '', gridName: ''}
    this.createGrid = this.createGrid.bind(this);
    this.setRows = this.setRows.bind(this);
    this.setCols = this.setCols.bind(this);
    this.setName = this.setName.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  setRows(event) {
      this.setState({ numRows: event.target.value });
  }
  
  setName(event) {
      this.setState({ gridName: event.target.value });
  }

  setCols(event) {
      this.setState({ numCols: event.target.value });
  }

  handleClick(event){

    manageLogin(this.createGrid);
  }

  createGrid(uid) {
    this.gridRef = firebase.database().ref('grids/');
    // Add new grid to the grids/
    let newGridRef = this.gridRef.push();
    let usersObj = {};
    usersObj[uid] = true;
    let newGridObj = {};
    newGridObj['numCols'] = parseInt(this.state.numCols);
    newGridObj['numRows'] = parseInt(this.state.numRows);
    newGridObj['users'] = usersObj;
    newGridRef.set(newGridObj);0
    // Add peprmission for the user who created.
    let userRef = firebase.database().ref('users/' + uid + '/grids/');
    let newGridKey = newGridRef.key;
    userRef.child(newGridKey).set((this.state.gridName).toString());
    this.props.changeGrid(newGridKey);
  }

  render(){
    return(
      <div className="col-xs-12">
        <button type="Submit" onClick={this.handleClick}>Create New Grid</button>
        Rows: <input type="text" value={this.state.numRows}
                             onChange={this.setRows} />
        Columns:<input type="text" value={this.state.numCols} 
                             onChange={this.setCols} />
        Grid Name:<input type="text" value={this.state.gridName} 
                             onChange={this.setName} />
      </div>
    );
  }
}


 NewGrid.propTypes = {
   changeGrid: React.PropTypes.func
 }