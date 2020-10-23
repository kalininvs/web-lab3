/*

Pyatnashki view

*/
var View = function(func1) {
    document.addEventListener("DOMContentLoaded", function() {  func1();  } );
};

View.prototype.init = function (arr,onKeyDownEvent){
    this.tableFill(arr,onKeyDownEvent);
};
View.prototype.tableFill = function(arr,onKeyDownEvent){
    var table = document.createElement("table"),
    tbody = document.createElement("tbody");
    table.id = "pyatnashki";				
	table.appendChild(tbody);
	for(i = 0; i < 4; ++i){
		var row = document.createElement("tr");
		for(j = 0; j < 4; ++j){
			var cell = document.createElement("td");
				cell.id = i + " " + j;
				cell.innerHTML = arr[i][j];
				row.appendChild(cell);
		}
		tbody.appendChild(row);					
    }
	if(Scene.childNodes.length >= 1)
    Scene.removeChild(Scene.firstChild);	
    Scene.appendChild(table);	
    document.getElementById('pyatnashki').addEventListener('click', onKeyDownEvent);
}
