import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class GridSelector extends React.Component {
  render() {
    var buttons = [];
    for (let gridName in this.props.possibleGrids) {
        buttons.push(
          <button className="btn btn-default" key={gridName} onClick={() => {
            this.props.gridSelector(gridName);
          }}>
            {this.props.possibleGrids[gridName]}
          </button>)
    }
    return (
       <div>{buttons}</div>
    )
  }
}

GridSelector.propTypes = {
    gridSelector: React.PropTypes.func,
    possibleGrids: React.PropTypes.object
}
