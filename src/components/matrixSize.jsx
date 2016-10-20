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
      this.setState({ numRows: event.target.value,gridId: this.props.gridId });
  }
  onUpdateCol(event) {
      this.setState({ numCols: event.target.value });
  }
  handleClick(){
  firebase.database().ref('grids/' + this.state.gridId + '/numRows' ).set(this.state.numRows);
  firebase.database().ref('grids/' + this.state.gridId + '/numCols' ).set(this.state.numCols);

   this.props.updateGrid(this.state.gridId);
  }
  componentDidMount(){
    this.setState({gridId: this.props.gridId});
  }

  render() {
    return (
    <div>
    <input
        className="form-control" type="text"
        placeholder="Enter new Row"
        defaultValue={this.state.numCols}
        onChange={this.onUpdateRow}/>
    <input
        className="form-control" type="text"
        placeholder="Enter New Column"
        defaultValue={this.state.numCols}
        onChange={this.onUpdateCol}/>
    <button className="btn btn-default" onClick={ this.handleClick }>Update Grid</button>
      </div>
    );
  }
}

MatrixSize.propTypes = {
  gridId: React.PropTypes.string,
  updateGrid: React.PropTypes.func
}
