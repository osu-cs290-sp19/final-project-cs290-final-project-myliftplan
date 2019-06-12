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

	var deleteButton = row.insertCell(-1);
	deleteButton.innerHTML = '<input type="button" value="Delete" onclick="deleteRow(this)"/>';

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
	var temp;
	var muscleArray = [];
	var liftNameArray = [];
	var setsArray = [];
	var repsArray = [];
	var restArray = [];
	var unitArray = [];
	var cellVals = new Array(5);
	
	var table = document.getElementById("lift-table");
	var liftTitle = document.getElementsByClassName("liftTitle");
	

	for(i = 1; i < table.rows.length; i++) {
		var cells = table.rows.item(i).cells;

		for(j = 0; j < cells.length - 1; j++)
		{
			cellVals[j] = cells.item(j).innerHTML;
		}
		muscleArray.push(cellVals[0]);
		liftNameArray.push(cellVals[1]);
		setsArray.push(cellVals[2]);
		repsArray.push(cellVals[3]);
		restArray.push(cellVals[4]);
	}

	for (i = 0; i < restArray.length; i++) {
		temp = restArray[i].split(" ");
		restArray[i] = temp[0];
		unitArray.push(temp[1]);
	}

	var postRequest = new XMLHttpRequest();
    var requestURL = '/plans/' + getPersonIdFromURL()  + '/editPlan';
	postRequest.open('POST', requestURL);

	var requestBody = JSON.stringify({
		title: liftTitle,
		muscle: muscleArray,
		liftName: liftNameArray,
		sets: setsArray,
		reps: repsArray,
		rest: restArray,
		unit: unitArray
	});

	postRequest.setRequestHeader('Content-Type', 'application/json');
	postRequest.send(requestBody);

	alert("The plan has been saved.");
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