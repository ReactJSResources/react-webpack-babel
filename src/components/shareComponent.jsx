import React from 'react';
import * as firebase from 'firebase';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class ShareComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            userToShareWith: ''
        }
        this.handleClick = this.handleClick.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
    }

    onUpdate(event) {
        this.setState({ userToShareWith: event.target.value });
    }

    handleClick() {
        var usersRef = firebase.database().ref('users/');
        usersRef.orderByChild('email').equalTo(this.state.userToShareWith).once("child_added", userSnapshot => {
            if(userSnapshot.val() !== null)
            {
                var gridRef = firebase.database().ref('grids/' + this.props.gridID);
                var newGridUserEntryRef = gridRef.child('users').child(userSnapshot.key);

                gridRef.once('value', gridRefSnapshot => {

                    //only add user to grid if the user is not on the grid
                    if(userSnapshot.child('grids').child(this.props.gridID).val() === null)
                    {
                        //update the grid's list of users
                        newGridUserEntryRef.set(true);
                    }
                    else
                    {
                        console.log("The specified user already is already listed on this grid");
                    }

                    //only add grid to user if the grid is not on the user
                    if(gridRefSnapshot.child('users').child(userSnapshot.key).val() === null)
                    {
                        //update the user's list of grids
                        var newUserGridEntryRef = firebase.database().ref('users/' + userSnapshot.key + '/grids/' + this.props.gridID);
                        newUserGridEntryRef.set(gridRefSnapshot.child('name').val());
                    }
                    else
                    {
                        console.log("The specified grid already is already listed on this user");
                    }
                });
            }
        });
    }

    render() {
        return (
            <div>
                <input type="text"  className="form-control" placeholder="Type an email" onChange={ this.onUpdate }/>
                <button className="btn btn-default" onClick={ this.handleClick }>Share</button>
            </div>
        )
    }
}
