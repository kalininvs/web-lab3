/*

Pyatnashki view

*/
var View = function(func1) {
	document.addEventListener("DOMContentLoaded", function() {  func1();  } );
	//context = null;
	cellsize = 0;
	//movingX = 1;
	//movingY = 1;
};

View.prototype.init = function (model,onKeyDownEvent){
	this.tableFill(model,onKeyDownEvent);
};
View.prototype.numView = function (){
	this.context.font = "bold "+ 
	(this.cellsize/2) + "px Sans";
	this.context.textAlign = "center";
	this.context.textBaseline = "middle";
	this.context.fillStyle = "#222";
}
View.prototype.cellView =  function(x, y,cellsize){
	this.context.fillStyle = "#00FFFF";
	this.context.fillRect(
	x+1, 
	y+1, 
	this.cellsize-2, 
	this.cellsize-2
	);
}
View.prototype.getNullCell = function(arr){
	for (var i = 0; i<4; i++){
		for (var j=0; j<4; j++){
			if(arr[i][j] === ""){
				return {'x': i, 'y': j};
			}
		}
	}
}
View.prototype.tableFill = function(model,onKeyDownEvent){
	this.pos = model.pos;
	var board = document.createElement("canvas");
	board.id = "canvas";
	board.width = 252;
	board.height = 252;
	this.cellsize = board.width / 4;
	var ctx = board.getContext("2d");
	this.context = ctx;
	var Empty = this.getNullCell(model.arr);
	for(i = 0; i < 4; ++i){
		
		for(j = 0; j < 4; ++j){
			// if(model.pos.x == i & model.pos.y == j)
			// {
			// 	this.cellView(Empty.y*this.cellsize,Empty.x*this.cellsize,this.cellsize);
			// 	this.context.beginPath();
			// 	this.numView();
				
			// 	this.context.fillText(
			// 		model.arr[i][j], 
			// 		Empty.y * this.cellsize + this.cellsize / 2,
			// 		Empty.x * this.cellsize + this.cellsize / 2
			// 	);
			// 	this.context.fill();
			// 	continue;
			// }
			// if(Empty.x == i & Empty.y == j)
			// {
			// 	this.cellView(model.pos.y*this.cellsize,model.pos.x*this.cellsize,this.cellsize);
			// 	this.context.beginPath();
			// 	this.numView();
			// 	this.context.fillText(
			// 		model.arr[i][j], 
			// 		model.pos.y * this.cellsize + this.cellsize / 2,
			// 		model.pos.x * this.cellsize + this.cellsize / 2
			// 	);
			// 	this.context.fill();
			// 	continue;
			// }
			this.cellView(j*this.cellsize,i*this.cellsize,this.cellsize);
			this.context.beginPath();
			this.numView();
			
			this.context.fillText(
				model.arr[i][j], 
				j * this.cellsize + this.cellsize / 2,
				i * this.cellsize + this.cellsize / 2
			);
			this.context.fill();
		}		
	}
	if(Scene.childNodes.length >= 1)
    Scene.removeChild(Scene.firstChild);	
	Scene.appendChild(board);	
    document.getElementById('canvas').addEventListener('click', onKeyDownEvent);
}
