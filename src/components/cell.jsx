import React from 'react';
import * as firebase from 'firebase';
import Palette from './palette.jsx';
import styles from '.././main.scss';

export default class Cell extends React.Component {
  constructor() {
      super();
      this.state = {
          color: 'rgb(255, 255, 255)'
      }
      this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
      this.cellRef = firebase.database().ref(this.props.gridID
                                             + '/r' + this.props.row
                                             + '/c' + this.props.col);
      this.cellRef.on('value', snap => {
          if (snap.val() !== null) {
              this.setState({color: snap.val()});
          }
      });
  }

  handleClick() {
    this.cellRef.set( this.props.color.selectedColor );
  }

  render() {
    const color_style = {backgroundColor: this.state.color};
    return (
      <div>
        <div onClick={this.handleClick}
             id={'R' + this.props.row + 'C' + this.props.col}
             style={color_style}
             className={styles.cell}>
        </div>
      </div>
    )
  }
}

Cell.propTypes = {
    row: React.PropTypes.number,
    col: React.PropTypes.number,
    gridID: React.PropTypes.string
}
