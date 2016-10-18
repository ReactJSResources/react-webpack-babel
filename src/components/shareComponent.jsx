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
        usersRef.orderByChild('email').equalTo(this.state.userToShareWith).once("child_added", snapshot => {
            if(snapshot.val() !== null)
            {
                var gridUserRef = firebase.database().ref('grids/' + this.props.gridID + '/users');
                var newGridUserEntryRef = gridUserRef.child(snapshot.key);

                newGridUserEntryRef.once("value", newGridUserEntrySnapshot => {
                    //only add if the user is not on the grid
                    if(newGridUserEntrySnapshot.val() === null)
                    {
                        //update the grid's list of users
                        newGridUserEntryRef.set(true);

                        //update the user's list of grids
                        var userGridRef = firebase.database().ref('users/' + snapshot.key + '/grids');
                        var newUserGridEntryRef = userGridRef.push();
                        newUserGridEntryRef.set(this.props.gridID);
                    }
                    else
                    {
                        console.log("The specified user already has access to this grid");
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
