document.getElementById("addLift").addEventListener("click", function(){
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

});


function deleteRow(btn) {
  var row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
}

function handleSaveClick() {
	
}

var saveWorkoutButton = documentgetElementById('save-button');
if(saveWorkoutButton){
	saveWorkoutButton.addEventListener('click', handleSaveClick);
}