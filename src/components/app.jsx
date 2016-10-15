import React from 'react';
import Matrix from './matrix.jsx';
import Palette from './palette.jsx';
import GridSelector from './GridSelection.jsx';
import ShareComponent from './shareComponent.jsx';
import '../main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as firebase from 'firebase';
import {manageLogin} from '../util/login.js'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedColor: 'rgb(0, 0, 0)',
      gridId: 'null',
      possibleGrids: {}
    }
    this.onUpdate = this.onUpdate.bind(this);
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

  onUpdate( val ){
    this.setState({ selectedColor: val });
  }

  changeGrid(newGrid) {
      this.setState({gridId: newGrid});
  }

  render() {
    console.log(this.state.possibleGrids);
    return (
      <div className="row">
        <div>
          <ShareComponent gridID={ this.state.gridId }/>
          <GridSelector gridSelector={this.changeGrid}
                        possibleGrids={this.state.possibleGrids}/>
        </div>
        <div className="container">
          <div className="col-xs-12 col-sm-9">
              <Matrix color={ this.state.selectedColor }
                      gridID={ this.state.gridId }/>
          </div>
          <div className="col-xs-12 col-sm-3">
              <Palette onUpdate={ this.onUpdate }/>
          </div>
        </div>
      </div>
    )
  }
}
