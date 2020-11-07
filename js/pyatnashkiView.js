/*

Pyatnashki view

*/
var Scene = document.getElementById("mainScene");
let animTime;
var View = function(func1) {
	document.addEventListener("DOMContentLoaded", function() {  func1();  } );
	canvas = null;
	cellsize = 0;
	movingX = 1;
	movingY = 1;
	animation = false;
	pos1 = { x: 100, y : 100, x0 : 100, y0 : 100};
	pos2 = { x: 100, y : 100, x0 : 100, y0 : 100};
};

View.prototype.init = function (model,onKeyDownEvent){
	this.initTable(model,onKeyDownEvent);
};
View.prototype.getAnimation = function() 
{
	return animation;
}
View.prototype.numView = function (){
	this.context.font = "bold "+ 
	(cellsize/2) + "px Sans";
	this.context.textAlign = "center";
	this.context.textBaseline = "middle";
	this.context.fillStyle = "#222";
}
View.prototype.cellView =  function(x, y,cellsize){
	this.context.fillStyle = "#00FFFF";
	this.context.fillRect(
	x+1, 
	y+1, 
	cellsize-2, 
	cellsize-2
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
View.prototype.animated = function(model) {
	animation = true;
	var Empty = this.getNullCell(model.arr); 
	if(Object.keys(model.pos).length == 0) { return;}
	this.setPosition(Empty,model.pos);
	animTime = setInterval(function() {
		
		this.checkPosition(model,Empty,model.pos);
	}.bind(this), 50);

}
View.prototype.setPosition = function(empty,pos) {
	pos1.x = (empty.y*cellsize); pos1.y = (empty.x*cellsize); 
	pos2.x = (pos.y*cellsize); pos2.y = (pos.x*cellsize);
	pos1.x0 = pos1.x; pos1.y0 = pos1.y;
	pos2.x0 = pos2.x; pos2.y0 = pos2.y;
}
View.prototype.checkPosition = function(model,empty,pos){
		if(empty.x == pos.x)
		{
			if(pos1.x0 < pos2.x0) { pos1.x += movingX; pos2.x -= movingX; }
			if(pos1.x0 > pos2.x0) { pos1.x -= movingX; pos2.x += movingX;}
		}
		if(empty.y == pos.y)
		{
			if(pos1.y0 < pos2.y0) { pos1.y += movingY; pos2.y -= movingY; }
			if(pos1.y0 > pos2.y0) { pos1.y -= movingY; pos2.y += movingY;}
		}
		this.tableFill(model);
}
View.prototype.initTable = function(model,onKeyDownEvent){
	canvas = document.createElement("canvas");
	canvas.id = "canvas";
	canvas.width = 252;
	canvas.height = 252;
	cellsize = canvas.width / 4;
	var ctx = canvas.getContext("2d");
	this.context = ctx;
	for(i = 0; i < 4; ++i){
		for(j = 0; j < 4; ++j){
			this.cellView(j*cellsize,i*cellsize,cellsize);
			this.context.beginPath();
			this.numView();
			this.context.fillText(
				model.arr[i][j], 
				j * cellsize + cellsize / 2,
				i * cellsize + cellsize / 2
			);
			this.context.fill();
		}		
	}
	if(Scene.childNodes.length >= 1)
    Scene.removeChild(Scene.firstChild);	
	Scene.appendChild(canvas);
	document.getElementById('canvas').addEventListener("click", function(e) {
		var mouse = {
			x:  Math.trunc((e.clientX - Scene.offsetLeft) / 63),
			y: Math.trunc((e.clientY - Scene.offsetLeft) / 63)
		}
		onKeyDownEvent(mouse);  } );
}
View.prototype.cellAnimated = function(text,pos){
	this.cellView(pos.x,pos.y,cellsize);
	this.context.beginPath();
	this.numView();
	this.context.fillText(
		text, 
		pos.x + cellsize / 2,
		pos.y + cellsize / 2
	);
	this.context.fill();
}
View.prototype.tableFill = function(model){
	var Empty = animation? this.getNullCell(model.arr) : 0;
	var ctx = document.getElementById('canvas').getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	this.context = ctx;
	this.cellAnimated(model.arr[Empty.x][Empty.y],pos2);
	this.cellAnimated(model.arr[model.pos.x][model.pos.y],pos1);
	for(i = 0; i < 4; ++i){
		for(j = 0; j < 4; ++j){
			if((model.pos.x == i & model.pos.y == j)|(Empty.x == i & Empty.y == j))
			{
				continue;
			}
			this.cellView(j*cellsize,i*cellsize,cellsize);
			this.context.beginPath();
			this.numView();
			this.context.fillText(
				model.arr[i][j], 
				j * cellsize + cellsize / 2,
				i * cellsize + cellsize / 2
			);
			this.context.fill();
		}		
	}
	if(this.checkAnimation()) { return; }
}
View.prototype.checkAnimation = function(){
	if(pos1.x == pos2.x0 & pos1.y == pos2.y0 & pos1.x != 100) 
	{
		pos1 = {};
		pos2 = {};
		clearTimeout(animTime);
		animation = false;
		return true;
	}
}