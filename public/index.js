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

var plancreator = document.getElementById("plancreator");
if(plancreator){
	plancreator.addEventListener('click', showModal);
}

function showModal(){
	var backdrop = document.getElementById("modal-backdrop");
	var workoutmodal = document.getElementById("add-workout-modal");
	
	backdrop.classList.remove("hidden");
	workoutmodal.classList.remove("hidden");
}

var closebutton = document.getElementById("modal-close-button");
var cancelbutton = document.getElementById("modal-cancel-button");
var acceptbutton = document.getElementById("modal-accept-button");

if(closebutton){
	closebutton.addEventListener('click', hidemodal);
}
if(cancelbutton){
	cancelbutton.addEventListener('click', hidemodal);
}
if(acceptbutton){
	acceptbutton.addEventListener('click', modalaccept);
}
function hidemodal(){
	var backdrop = document.getElementById("modal-backdrop");
        var workoutmodal = document.getElementById("add-workout-modal");

        backdrop.classList.add("hidden");
        workoutmodal.classList.add("hidden");
	
	clearmodalvals();
}

function clearmodalvals(){
	var modalinput = document.getElementsByClassName("modal-input");
	for(var i = 0; i < modalinput.length; i++){
		var input = modalinput[i].querySelector('input, textarea');
		input.value = '';
	}
}

function modalaccept(){
	var cardname = document.getElementById("modal-name").value;
	var carddesc = document.getElementById("modal-desc").value;
	
	if(cardname && carddesc){
		//NOAH YOUR MONGO STUFF GOES HERE
		
		hidemodal();	
	}
	else{
		alert("Please fill out the required fields brochacho!");
	}
	

}
