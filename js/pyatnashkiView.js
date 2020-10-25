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
	var board = document.createElement("canvas");
	board.id = "canvas";
	board.width = 280;
	board.height = 275;
	var ctx = board.getContext("2d");
	
	var posi = 0,posj=0;
	var number = 0;
	var image1 = new Image();
    image1.src = 'assets/1.png';
    image1.onload = function() {
            ctx.drawImage(image1, 0, 0,60,60);
         // 1 second (in milliseconds)
    };
	for(i = 0; i < 4; ++i){
		
		for(j = 0; j < 4; ++j){
			ctx.beginPath();
			ctx.fillStyle = "#00FFFF";
			ctx.fillRect(posi,posj,60,60);
			ctx.clearRect(posi+10,posj+10,40,40);
			ctx.fill();
			ctx.beginPath();
			ctx.fillStyle = "#000"
			ctx.font = "italic 15pt Arial";
			ctx.fillText(number, posi+20,posj+35);
			ctx.fill();
			posi += 70;
			number+=1;
		}
			posi = 0;
	 		posj += 70;			
    }
    // var table = document.createElement("table"),
    // tbody = document.createElement("tbody");
    // table.id = "pyatnashki";				
	// table.appendChild(tbody);
	// for(i = 0; i < 4; ++i){
	// 	var row = document.createElement("tr");
	// 	for(j = 0; j < 4; ++j){
	// 		var cell = document.createElement("td");
	// 			cell.id = i + " " + j;
	// 			cell.innerHTML = arr[i][j];
	// 			row.appendChild(cell);
	// 	}
	// 	tbody.appendChild(row);					
    // }
	if(Scene.childNodes.length >= 1)
    Scene.removeChild(Scene.firstChild);	
	// Scene.appendChild(table);
	Scene.appendChild(board);	
    document.getElementById('canvas').addEventListener('click', onKeyDownEvent);
}
// View.prototype.tableFill = function(arr,onKeyDownEvent){
//     var table = document.createElement("table"),
//     tbody = document.createElement("tbody");
//     table.id = "pyatnashki";				
// 	table.appendChild(tbody);
// 	for(i = 0; i < 4; ++i){
// 		var row = document.createElement("tr");
// 		for(j = 0; j < 4; ++j){
// 			var cell = document.createElement("td");
// 				cell.id = i + " " + j;
// 				cell.innerHTML = arr[i][j];
// 				row.appendChild(cell);
// 		}
// 		tbody.appendChild(row);					
//     }
// 	if(Scene.childNodes.length >= 1)
//     Scene.removeChild(Scene.firstChild);	
//     Scene.appendChild(table);	
//     document.getElementById('pyatnashki').addEventListener('click', onKeyDownEvent);
// }
