import React from 'react';
import * as firebase from 'firebase';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class DeleteGrid extends React.Component {
  render(){
    return(
      <button type="button" className="btn btn-danger">Delete Grid</button>
    );
  } 
}