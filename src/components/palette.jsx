import React from 'react';
import styles from '.././main.scss';
import colors from '.././_colors.scss';

export default class Palette extends React.Component {
  constructor(){
    super();
    this.state = {
      selectedColor: 'black'
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick( event ){
    this.setState( { selectedColor: event.target.style.backgroundColor } );
    console.log( 'selected color is', event.target.style.backgroundColor)
  }

  render(){
    const colorStyleSheet = document.styleSheets[2].cssRules;

    let paintColor;
    let paintPots = [];

    for( var i = 0; i < colorStyleSheet.length; i++ ){
      paintColor = { backgroundColor: colorStyleSheet[i].style['background-color'] }

      paintPots.push( <div key={i}
                           onClick={ this.handleClick }
                           style={ paintColor }
                           className={ styles.paintPot }>
                      </div>
      )
    }

    return(
      <div id="palette">
        <div className="row"> {paintPots} </div>
      </div>
    )
  }
}