import React from 'react';
import * as firebase from 'firebase';
import { Modal } from 'react-bootstrap';
import _ from 'lodash';

import styles from '.././main.scss';

export default class ShareComponent extends React.Component {
  constructor(){
    super();
    this.state = {
        userToShareWith: '',
        currentUsers: [],
        showModal: false
    }

    this.handleShare = this.handleShare.bind( this );
    this.onUpdate = this.onUpdate.bind( this );
    this.open = this.open.bind( this );
    this.close = this.close.bind( this );
  }

  onUpdate( event ){
    this.setState({ userToShareWith: event.target.value });
  }

  open(){
    this.setState({ showModal: true });
  }

  close(){
    this.setState({ showModal: false });
  }

  componentWillReceiveProps() {
    this.gridUserRef = firebase.database().ref( 'grids/' + this.props.gridID + '/users' );
    this.usersRef = firebase.database().ref( 'users/' );

    let currentUserArray = [];
    let currentUserEmails = [];

    // gets keys of current grid users
    this.gridUserRef.once( "value", snapshot => {
      snapshot.forEach( user => {
        currentUserArray.push( user.key )
      } );
    } );

    // matches keys to user list to retrieve emails
    this.usersRef.once( "value", snapshot => {
      snapshot.forEach( user => {
        if ( _.includes( currentUserArray, user.key ) ){
          currentUserEmails.push( user.child("email").val() )
        }
      } );
    } );

    this.setState({ currentUsers: currentUserEmails });
  }

  handleShare(){
    let usersRef = firebase.database().ref( 'users/' );

    usersRef.orderByChild( 'email' ).equalTo( this.state.userToShareWith ).once( "child_added", snapshot => {
      if( snapshot.val() !== null ){
        let gridUserRef = firebase.database().ref( 'grids/' + this.props.gridID + '/users' );
        let newGridUserEntryRef = gridUserRef.child( snapshot.key );

        newGridUserEntryRef.once( "value", newGridUserEntrySnapshot => {
            // only add if the user is not on the grid
            if( newGridUserEntrySnapshot.val() === null ){
                // update the grid's list of users
                newGridUserEntryRef.set( true );

                // update the user's list of grids
                let userGridRef = firebase.database().ref( 'users/' + snapshot.key + '/grids' );
                let newUserGridEntryRef = userGridRef.push();
                newUserGridEntryRef.set( this.props.gridID );

                // closes modal window
                this.setState({ showModal: false });
            }
            else{
                console.log( "The specified user already has access to this grid." );
            }
        } );
      }
    } );
  }

  render(){
    return (
      <div>
        <button className="btn btn-primary" onClick={ this.open }>Share Grid</button>

        <Modal show={this.state.showModal} onHide={ this.close }>
          <Modal.Header closeButton>
            <Modal.Title>Share this grid with other users</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input type="text" className="form-control" placeholder="Enter an email address" onChange={ this.onUpdate }/>
            <p className={ styles.sharedWith }>Currently shared with { this.state.currentUsers.join(', ') }</p>
          </Modal.Body>
          <Modal.Footer>
              <button className={"btn btn-default " + styles.modalButton } onClick={ this.close }>Close</button>
              <button className={"btn btn-primary " + styles.modalButton } onClick={ this.handleShare }>Share</button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
