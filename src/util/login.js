import * as firebase from 'firebase';

function promptForLogin(uidCallback) {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        var user = result.user;
        var uid = user.uid;
        var user_email = user.email;

        // check if account already exists, if not add an entry.
        var accountCheck = firebase.database().ref('users/' + uid);
        accountCheck.once("value", snapshot => {
            if (snapshot.val() === null) {
                accountCheck.set({
                    admin: 'false',
                    email: user_email,
                    grids: {}
                });
            }
        });

        // Pass uid to the specified callback.
        uidCallback(user.uid);
    }).catch(function(error) {
        console.log(error);
    });
}

/* Manages the login for a user, if they are not logged in prompt for a log
 * in.
 *
 * Args:
 *  uidCallback: Callback to be executed with parameter of user id.
 */
export function manageLogin(uidCallback) {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            uidCallback(user.uid);
        } else {
            promptForLogin(uidCallback);
        }
    });
}
