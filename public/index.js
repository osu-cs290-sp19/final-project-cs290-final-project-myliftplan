function addLift() {
	var table = document.getElementsByClassName("liftTable");
	var row = table[0].insertRow(-1);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);
	var cell5 = row.insertCell(4);
	cell1.innerHTML = "Muscle";
	cell2.innerHTML = "Lift Name";
	cell3.innerHTML = "Sets";
	cell4.innerHTML = "Reps";
	cell5.innerHTML = "Rest";

	var cell6 = row.insertCell(5);
	var cell6 = document.createElement('button');
	button.innerHTML = "Delete";

}


function deleteRow(btn) {
  var row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
}

function getPersonIdFromURL() {
	var path = window.location.pathname;
  	var pathParts = path.split('/');
  	if (pathParts[1] === "plans") {
    	return pathParts[2];
 	} else {
    	return null;
  	}
}
function handleSaveClick() {
	var i;
	var j;
	var cellVals = new Array(5);
	var table = document.getElementById("lift-table");

	

	for(i = 1; i < table.rows.length; i++) {
		var cells = table.rows.item(i).cells;

		for(j = 0; j < cells.length - 1; j++)
		{
			cellVals[j] = cells.item(j).innerHTML;
		}
	}
	
	var postRequest = new XMLHttpRequest();
    var requestURL = '/plans/' + getPersonIdFromURL()  + '/editPlan';
	postRequest.open('POST', requestURL);

	var requestBody = JSON.stringify({
		muscle: cellVals[0],
		liftName: cellVals[1],
		sets: cellVals[2],
		reps: cellVals[3],
		rest: cellVals[4]
	});

	postRequest.setRequestHeader('Content-Type', 'application/json');
	postRequest.send(requestBody);
}

 
window.addEventListener('DOMContentLoaded', function() {

	var saveWorkoutButton = document.getElementById("save-button");
	if(saveWorkoutButton){
	saveWorkoutButton.addEventListener('click', handleSaveClick);
	}

	var addLiftRow = document.getElementById("addLift");
	if(addLiftRow) {
		addLiftRow.addEventListener('click', addLift);
	}

});