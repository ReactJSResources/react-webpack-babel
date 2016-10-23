import React from 'react';
import Cell from './cell.jsx';
import styles from '.././main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as firebase from 'firebase';

export default class Matrix extends React.Component {
  constructor() {
    super();
    this.state  = {
        numRows: 0,
        numCols: 0
    };
  }

  componentDidMount() {
      this.updateGridSize(this.props);
 }

  componentWillReceiveProps(nextProps) {
      if (this.props.numCols !== nextProps.numCols) {
          this.updateGridSize(nextProps);
      }
  }

  updateGridSize(nextProps) {
     this.setState({numRows: 0, numCols: 0});
     this.rowRef = firebase.database().ref('grids/' + nextProps.gridID + '/numRows');
     this.rowRef.once('value', snap => {
         if (snap.val() !== null) {
             this.setState({numRows: snap.val()});
         }
     });
     this.colRef = firebase.database().ref('grids/' + nextProps.gridID + '/numCols');
     this.colRef.once('value', snap => {
         if (snap.val() !== null) {
             this.setState({numCols: snap.val()});
         }
     });
  }

  render() {
    if (this.state.numRows === 0 || this.state.numCols === 0) {
        return(
          <p> Could not load grid! </p>
        )
    }
    let matrix = []
    for(var i = 0; i < this.state.numCols;i++){
      let column = []
      for(var j = 0;j < this.state.numRows;j++){
        column.push(<Cell row={j} col={i} key={'r' + j + 'c' + i}
                     gridID={this.props.gridID} color={this.props.color} />)
      }
      matrix.push(<div key={i} className={styles.matrixColumn}>{column}</div>)
    }
    return(
      <div className={styles.matrix}>{matrix}</div>
    )
  }
}

Matrix.propTypes = {
    gridID: React.PropTypes.string,
    color: React.PropTypes.string,
    numCols: React.PropTypes.string,
    numRows: React.PropTypes.string
}
