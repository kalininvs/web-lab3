/*

Pyatnashki view

*/
var Scene = document.getElementById("mainScene");
let animTime;
var View = function(func1) {
	document.addEventListener("DOMContentLoaded", function() {  func1();  } );
	cellsize = 0;
	movingX = 1;
	movingY = 1;
	animation = false;
	pos1 = { x: 100, y : 100, x0 : 100, y0 : 100};
	pos2 = { x: 100, y : 100, x0 : 100, y0 : 100};
};

View.prototype.init = function (model,onKeyDownEvent){
	this.tableFill(model,onKeyDownEvent);
};
View.prototype.getAnimation = function() 
{
	return animation;
}
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
View.prototype.animated = function(model,onKeyDownEvent) {
	animation = true;
	var Empty = this.getNullCell(model.arr); 
	var pos = model.pos;
	if(Object.keys(pos).length == 0) { return;}
	pos1.x = (Empty.y*this.cellsize); pos1.y = (Empty.x*this.cellsize); 
	pos2.x = (pos.y*this.cellsize); pos2.y = (pos.x*this.cellsize);
	if(pos1.x > pos2.x) { pos1.x += 1; pos2.x -=1; }
	if(pos1.x < pos2.x) { pos1.x -=1;  pos2.x +=1;}
	if(pos1.y > pos2.y) { pos1.y += 1; pos2.y -=1;}
	if(pos1.y < pos2.y) { pos1.y -= 1; pos2.y +=1;}
	pos1.x0 = pos1.x; pos1.y0 = pos1.y;
	pos2.x0 = pos2.x; pos2.y0 = pos2.y;
	animTime = setInterval(function() {
		if(Empty.x == pos.x)
		{
			if(pos1.x0 < pos2.x0) { pos1.x += movingX; pos2.x -= movingX; }
			if(pos1.x0 > pos2.x0) { pos1.x -= movingX; pos2.x += movingX;}
		}
		if(Empty.y == pos.y)
		{
			if(pos1.y0 < pos2.y0) { pos1.y += movingY; pos2.y -= movingY; }
			if(pos1.y0 > pos2.y0) { pos1.y -= movingY; pos2.y += movingY;}
		}
		View.prototype.tableFill(model,onKeyDownEvent)
	  }, 50);
}
View.prototype.setPosition = function(){

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
	var Empty = animation? this.getNullCell(model.arr) : 0; 
	for(i = 0; i < 4; ++i){
		
		for(j = 0; j < 4; ++j){
			if(this.pos.x == i & this.pos.y == j)
			{
				this.cellView(pos1.x,pos1.y,this.cellsize);
				this.context.beginPath();
				this.numView();
				this.context.fillText(
					model.arr[i][j], 
					pos1.x + this.cellsize / 2,
					pos1.y + this.cellsize / 2
				);
				this.context.fill();
				continue;
			}
			if(Empty.x == i & Empty.y == j)
			{
				this.cellView(pos2.x,pos2.y,this.cellsize);
				this.context.beginPath();
				this.numView();
				this.context.fillText(
					model.arr[i][j], 
					pos2.x + this.cellsize / 2,
					pos2.y + this.cellsize / 2
				);
				this.context.fill();
				continue;
			}
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
	if(pos1.x == pos2.x0 & pos1.y == pos2.y0 & pos1.x != 100) 
	{
		pos1 = {};
		pos2 = {};
		clearTimeout(animTime);
		animation = false;
		return;
	}
	if(Scene.childNodes.length >= 1)
    Scene.removeChild(Scene.firstChild);	
	Scene.appendChild(board);
	//document.getElementById('canvas').addEventListener('click', onKeyDownEvent);
	document.getElementById('canvas').addEventListener("click", function(e) {
		var mouse = {
			x:  Math.trunc((e.clientX - Scene.offsetLeft) / 63),
			y: Math.trunc((e.clientY - Scene.offsetLeft) / 63)
		}
		onKeyDownEvent(mouse);  } );
}