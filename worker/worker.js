// The frequency in seconds in which to make some move on the grid.
FREQUENCE_S = 15;

// This function should be replaced by some script that makes updates Firebase.
function stubFunction() {
	console.log("Triggered");
}



function changeColor() {

	var dimensions = {};

	// connect to grid and count rows
	var rowCountRef = firebase.database().ref('grid0/');
	rowCountRef.once("value", function(snapshot) {
	
		dimensions.rows = snapshot.numChildren();

		// decide on a random row
		var randomRow = 'r' + Math.floor(Math.random() * dimensions.rows) + '/';

		// connect to row and count columns
		var colCountRef = firebase.database().ref('grid0/' + randomRow);
		colCountRef.once("value", function(snapshot) {

			dimensions.columns = snapshot.numChildren();

			// decide on a random column
			var randomColumn = 'c' + Math.floor(Math.random() * dimensions.columns) + '/';

			// connect to column and choose random cell
			var cellRef = firebase.database().ref('grid0/' + randomRow + randomColumn);

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

};



setInterval(stubFunction, frequency_s * 1000);
