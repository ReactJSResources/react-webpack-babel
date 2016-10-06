var firebase = require('firebase');

// The frequency in seconds in which to make some move on the grid.
var FREQUENCY_S = 5;

// Firebase IDs
var GRID_NAME = 'grid0/';
var NUM_ROWS = 'numRows/';
var NUM_COLS = 'numCols/';

// Dimensions object constants.
var dimensions = {};
var ROW_KEY = 'row';
var COL_KEY = 'col';
dimensions[ROW_KEY] = 3;
dimensions[COL_KEY] = 3;

/*
 * Initialize and sign on anonymously to firebase.
 */
function initFirebase() {
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
}

/*
 * Change the color of a random cell in the grid.
 */
function changeColor() {
    // Find a random cell and toggle its value.
	var randomRow = 'r' + Math.floor(Math.random() * dimensions[ROW_KEY]) + '/';
    var randomColumn = 'c' + Math.floor(Math.random() * dimensions[COL_KEY])
                           + '/';
	var cellRef = firebase.database().ref('grid0/' + randomRow
                                          + randomColumn);

	// change cell color
	cellRef.transaction(function(currentData) {
		if (currentData === "#FFFFFF") {
			return "#000000";
		} else {
			// Since we assume non-initialized cells are already white we
            // do not have to check for a null case.
			return "#FFFFFF";
		}
	});
}

function initDimensions(callback) {
    var rowNumRef = firebase.database().ref(GRID_NAME + NUM_ROWS);
    var colNumRef = firebase.database().ref(GRID_NAME + NUM_COLS);
    rowNumRef.once('value', function(rowNumSnapshot) {
        dimensions[ROW_KEY] = rowNumSnapshot.val();
         colNumRef.once('value', function(colNumSnapshot) {
             dimensions[COL_KEY] = colNumSnapshot.val();
             callback();
         }, function(err) {
             console.log(err);
         });
    }, function (err) {
        console.log(err)
    });
}

/*
 * Run the worker function.
 *
 * Args:
 *  updateFrequence: How often the worker will update a cell in the grid.
 */
function main(updateFrequency) {
    initFirebase();
    initDimensions(function() {
        setInterval(changeColor, updateFrequency * 1000);
    });
}

main(FREQUENCY_S);
