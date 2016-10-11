import styles from '.././index.scss';
import React from 'react';
import * as firebase from 'firebase';

export default class Cell extends React.Component {
  constructor() {
      super();
      this.state = {
          color: '#FFFFFF'
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
    if (this.state.color === '#FFFFFF') {
        this.cellRef.set('#000000');
    } else {
        this.cellRef.set('#FFFFFF');
    }
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
