import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as firebase from 'firebase';
import {manageLogin} from '../util/login.js'
import { Modal } from 'react-bootstrap';
import styles from '.././main.scss';

export default class NewGrid extends React.Component {
  constructor(){
    super();
    this.state = {numRows: '',numCols: '', gridName: '', showModal: false}
    this.createGrid = this.createGrid.bind(this);
    this.setRows = this.setRows.bind(this);
    this.setCols = this.setCols.bind(this);
    this.setName = this.setName.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  open(){
    this.setState({ showModal: true });
  }

  close(){
    this.setState({ showModal: false });
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
        <button className="btn btn-primary" onClick={this.open}>New Grid</button>
        
        <Modal show={ this.state.showModal } onHide={ this.close }>
          <Modal.Header closeButton>
            <Modal.Title>Create New Grid</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><input type="text" className="form-control" placeholder="Name for new grid" 
                                          onChange={this.setName} /></p>
            <p><input type="text" className="form-control" placeholder="Number of rows"
                                         onChange={this.setRows} /></p>
            <p><input type="text" className="form-control" placeholder="Number of columns" 
                                          onChange={this.setCols} /></p>
          </Modal.Body>
          <Modal.Footer>
              <button className={ "btn btn-default " + styles.modalButton } onClick={ this.close }>Close</button>
              <button className={ "btn btn-primary " + styles.modalButton } onClick={ this.handleClick }>Create</button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

 NewGrid.propTypes = {
   changeGrid: React.PropTypes.func
 }
