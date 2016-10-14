import React from 'react';
import styles from '.././index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {matrixID} from './data.jsx';

export class CustomMatrix extends React.Component {
  constructor(props) {
    super(props);
    this.state = {rowValue: matrixID[0]};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({rowValue: event.target.rowValue});
  }

  render() {
    return (<div><form className="form-horizontal">
      <div className="form-group">
        <label for="inputRow" className="col-sm-1 control-label">Rows</label>
        <div className="col-sm-2">
          <input type="row" className="form-control" id="inputRow" placeholder={matrixID[0]} value={rowValue}></input>
        </div>
        <div className="col-sm-9"></div>
      </div>
      <div className="form-group">
        <label for="input" className="col-sm-1  control-label">Column</label>
        <div className="col-sm-2">
          <input type="column" className="form-control" id="inputColumn" placeholder={matrixID[1]} ></input>
        </div>
        <div className="col-sm-9"></div>
      </div>
      <button type="submit" className="btn btn-default">Change Matrix</button>
    </form></div>
    );
  }
}
