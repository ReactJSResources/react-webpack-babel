import React from 'react';
import styles from '.././main.scss';
import colors from '.././_colors.scss';

export default class Palette extends React.Component {
  constructor(){
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick( event ){
    // onUpdate updates the parent with the color to pass to the matrix cell
    this.props.onUpdate( event.target.style.backgroundColor );
  }

  render(){
    const colorStyleSheet = document.styleSheets[1].cssRules;

    let paintColor;
    let paintPots = [];

    for( var i = 0; i < colorStyleSheet.length; i++ ){
      paintColor = { backgroundColor: colorStyleSheet[i].style['background-color'] }

      paintPots.push(
        <div key={i}
             onClick={ this.handleClick }
             style={ paintColor }
             className={ styles.paintPot }>
        </div>
      )
    }

    return(
      <div className={ styles.palette }>
        <div className="row">{ paintPots }</div>
      </div>
    )
  }
}