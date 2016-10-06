// Set up Firebase.
var firebase = require('firebase');
var config = {
  apiKey: "AIzaSyAzPSc-CtNCs0zbU0KkIu5NzcRFnhkeabo",
  authDomain: "gridproject-fd25f.firebaseapp.com",
  databaseURL: "https://gridproject-fd25f.firebaseio.com",
  storageBucket: "gridproject-fd25f.appspot.com",
  messagingSenderId: "187144675114"
};
firebase.initializeApp(config);
firebase.auth().signInAnonymously().catch(function(error) {
    console.log("Could not auth", error);
});

// The frequency in seconds in which to make some move on the grid.
var FREQUENCY_S = 5;

function changeColor() {

	var dimensions = {};

	// connect to grid and count rows
	var rowCountRef = firebase.database().ref('grid0/');
	rowCountRef.once("value", function(rowSnapshot) {
		dimensions.rows = rowSnapshot.numChildren();

		// decide on a random row
		var randomRow = 'r' + Math.floor(Math.random() * dimensions.rows)
                        + '/';

		// connect to row and count columns
		var colCountRef = firebase.database().ref('grid0/' + randomRow);
		colCountRef.once("value", function(colSnapshot) {

			dimensions.columns = colSnapshot.numChildren();

			// decide on a random column
			var randomColumn = 'c' + Math.floor(Math.random()
                                                * dimensions.columns) + '/';

			// connect to column and choose random cell
			var cellRef = firebase.database().ref('grid0/' + randomRow
                                                  + randomColumn);

			// change cell color
			cellRef.transaction(function(currentData) {

				if (currentData === "#000000") {
					// if white, then black
					return "#ffffff";
				} else {
					// if black, then white
					return "#000000";
				}
			});
		});
	});
}
setInterval(changeColor, FREQUENCY_S * 1000);
