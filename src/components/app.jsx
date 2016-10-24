import React from 'react';
import * as firebase from 'firebase';

import Matrix from './matrix.jsx';
import MatrixSize from './matrixSize.jsx'
import Palette from './palette.jsx';
import Randomize from './randomize.jsx';
import GridSelector from './GridSelection.jsx';
import ShareComponent from './shareComponent.jsx';
import NavBar from './navbar.jsx';
import DeleteGrid from './deleteGrid.jsx';
import ResetGridColor from './resetGridColor.jsx';

import styles from '../main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import {manageLogin} from '../util/login.js'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedColor: 'rgb(0, 0, 0)',
      gridId: 'null',
      possibleGrids: {},
      numRows: 0,
      numCols: 0
    }
    this.onSelectColor = this.onSelectColor.bind(this);
    this.changeGrid = this.changeGrid.bind(this);
    this.getAvailableGrids = this.getAvailableGrids.bind(this);
  }

  componentDidMount() {
    manageLogin(this.getAvailableGrids);
  }

  getAvailableGrids(uid) {
     let userGridsRef = firebase.database().ref('users/' + uid + '/grids');
     userGridsRef.on('value', snap => {
         this.setState({possibleGrids: snap.val()});
     });
  }

  onSelectColor( val ){
    this.setState({ selectedColor: val });
  }
  changeGrid(newGrid) {
      this.setState({gridId: newGrid});

      let rowRef = firebase.database().ref('grids/' + newGrid +'/numRows');
      rowRef.on('value', snap => {
          this.setState({numRows: snap.val()});
      });
      let colRef = firebase.database().ref('grids/' + newGrid +'/numCols');
      rowRef.on('value', snap => {
          this.setState({numCols: snap.val()});
      });
  }

  resetGridColors(){
    this.setState({selectedColor: 'rgb(0, 0, 0)'});
  }

  render() {
    return (
      <div>
        <NavBar/>
        <div className="container">
          <div className="row">
            <div className={styles.topBuffer}></div>
            <div className="col-sm-2">
              <GridSelector gridSelector={this.changeGrid}
                            possibleGrids={this.state.possibleGrids}
              />
            </div>
            <div className="col-sm-2">
              <Randomize gridId={this.state.gridId}/>
            </div>
            <div className="col-sm-2">
              <ResetGridColor gridId={ this.state.gridId }
                              numCols={ this.state.numCols }
                              numRows={ this.state.numRows }
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-10">
                <Matrix color={ this.state.selectedColor }
                        gridID={ this.state.gridId }
                        numCols={this.state.numCols }
                        numRows={ this.state.numRows }
                />
            </div>
            <div className="col-xs-12 col-sm-12 col-md-2">
                <Palette onSelectColor={ this.onSelectColor }/>
            </div>
            <div className="row">
              <div className="cols-sm-offset-3 col-sm-3">
                <ShareComponent gridID={ this.state.gridId }/>
              </div>
              <div className="cols-sm-offset-2 col-sm-2">
                <MatrixSize gridId={ this.state.gridId} updateGrid={this.changeGrid}/>
              </div>
             <div className="col-sm-5">
               <DeleteGrid/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
