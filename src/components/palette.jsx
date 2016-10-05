import React from 'react';
import styles from '.././index.scss';

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
    const paint_color = { backgroundColor: 'red' };     // PLACEHOLDER: will be passed in from variable stylsheet?

    // make this a loop after colors are defined
    return (
      <div id="palette">
        <div className="row">
          <div onClick={ this.handleClick }
               style={ paint_color }
               className={ styles.paint }>
          </div>
          <div onClick={ this.handleClick }
               style={ paint_color }
               className={ styles.paint }>
          </div>
          <div onClick={ this.handleClick }
               style={ paint_color }
               className={ styles.paint }>
          </div>
        </div>
      </div>
    )
  }
}