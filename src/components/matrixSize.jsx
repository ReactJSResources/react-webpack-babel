import React from 'react';
import * as firebase from 'firebase';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class MatrixSize extends React.Component {
  constructor() {
    super();
    this.state = {numRows: '',numCols: ''}
    this.onUpdateRow = this.onUpdateRow.bind(this);
    this.onUpdateCol = this.onUpdateCol.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  onUpdateRow(event) {
      this.setState({ numRows: event.target.value });
  }
  onUpdateCol(event) {
      this.setState({ numCols: event.target.value });
  }
  handleClick(){
    let rowRef = firebase.database().ref('grids/' + this.props.gridId).update({
    numRows: this.state.numRows
    }).then(function(ref) {
    console.log(ref)
    }).catch(function(error) {
    console.log('Failed: ' + error);
    });
    let colRef = firebase.database().ref('grids/' + this.props.gridId).update({
    numCols: this.state.numCols
    }).then(function(ref) {
    console.log(ref)
    }).catch(function(error) {
    console.log('Failed: ' + error);
    });
  }
  componentDidMount(){
    this.setState({numRows: this.props.numRows,numCols: this.props.numCols,gridId: this.props.gridId})

  }

  render() {
    return (
    <div>
    <input
        type="text"
        placeholder="Enter new Row"
        defaultValue={this.state.numCols}
        onChange={this.onUpdateRow}/>
        <input
            type="text"
            placeholder="Enter New Column"
            defaultValue={this.state.numCols}
            onChange={this.onUpdateCol}/>
        <button onClick={ this.handleClick }>Update Grid</button>
      </div>
    );
  }
}

MatrixSize.propTypes = {
  gridId: React.PropTypes.string,
  numRows: React.PropTypes.any,
  numCols: React.PropTypes.any
}
