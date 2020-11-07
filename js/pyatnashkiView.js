/*

Pyatnashki view

*/
var Scene = document.getElementById("mainScene");
let animTime;
var View = function(func1) {
	document.addEventListener("DOMContentLoaded", function() {  func1();  } );
	svg = null;
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
	svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
	svg.setAttributeNS('http://www.w3.org/2000/svg','xlink','http://www.w3.org/1999/xlink');
	svg.setAttribute ("width", "252" );
	svg.setAttribute ("height", "252" );
	svg.setAttribute ("id", "svg" );
	cellsize = svg.getAttribute("width") / 4;
	for(i = 0; i < 4; ++i){
		for(j = 0; j < 4; ++j){
			svg.appendChild(this.getNode('rect', {id:i+""+j , x: j*cellsize+1, y:i*cellsize+1, width:cellsize-2, height:cellsize-2, fill:'#00FFFF' }));
			svg.appendChild(this.setText('text',model.arr[i][j], {x: (j * cellsize + cellsize / 2)-5, y: (i * cellsize + cellsize / 2)+5, fill:'red' }));
		}		
	}
	if(Scene.childNodes.length >= 1)
    Scene.removeChild(Scene.firstChild);	
	Scene.appendChild(svg);
	document.getElementById('svg').addEventListener("click", function(e) {
		var mouse = {
			x:  Math.trunc((e.clientX - Scene.offsetLeft) / 63),
			y: Math.trunc((e.clientY - Scene.offsetLeft) / 63)
		}
		onKeyDownEvent(mouse);  } );
}
View.prototype.getNode = function(n, v) {
	n = document.createElementNS('http://www.w3.org/2000/svg', n);
	for (var p in v)
	  n.setAttributeNS(null, p, v[p]);
	return n
}
View.prototype.setText = function(n,text, v) {
	n = document.createElementNS('http://www.w3.org/2000/svg', n);
	n.setAttributeNS(null,'font-family','Avenir, Helvetica, sans-serif');
	n.setAttributeNS(null,'font-size',cellsize/3+"px");
	n.setAttributeNS(null,'font-weight','bold');
	n.innerHTML = text;
	for (var p in v)
	{
		if(p=="x"&Number(text)>=10){ n.setAttributeNS(null, p,Number(v[p])-5 ); continue; }
		n.setAttributeNS(null, p, v[p]);
	}
	return n
}
View.prototype.cellAnimated2 = function(text,pos){
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
View.prototype.cellAnimated = function(text,pos){
	svg.appendChild(this.getNode('rect', {id:pos.x+""+pos.y , x: pos.x+1, y:pos.y+1, width:cellsize-2, height:cellsize-2, fill:'#00FFFF' }));
	svg.appendChild(this.setText('text',text, {x: (pos.x+ cellsize / 2)-5, y: (pos.y + cellsize / 2)+5, fill:'red' }));
}
View.prototype.tableFill = function(model){
	while (svg.lastChild) {
		svg.removeChild(svg.lastChild);
	}
	var Empty = animation? this.getNullCell(model.arr) : 0;
	this.cellAnimated(model.arr[Empty.x][Empty.y],pos2);
	this.cellAnimated(model.arr[model.pos.x][model.pos.y],pos1);
	for(i = 0; i < 4; ++i){
		for(j = 0; j < 4; ++j){
			if((model.pos.x == i & model.pos.y == j)|(Empty.x == i & Empty.y == j))
			{
				continue;
			}
			svg.appendChild(this.getNode('rect', {id:i+""+j , x: j*cellsize+1, y:i*cellsize+1, width:cellsize-2, height:cellsize-2, fill:'#00FFFF' }));
			svg.appendChild(this.setText('text',model.arr[i][j], {x: (j * cellsize + cellsize / 2)-5, y: (i * cellsize + cellsize / 2)+5, fill:'red' }));
			// this.cellView(j*cellsize,i*cellsize,cellsize);
			// this.context.beginPath();
			// this.numView();
			// this.context.fillText(
			// 	model.arr[i][j], 
			// 	j * cellsize + cellsize / 2,
			// 	i * cellsize + cellsize / 2
			// );
			// this.context.fill();
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