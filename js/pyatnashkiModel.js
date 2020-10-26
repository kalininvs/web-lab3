/*

Pyatnashki model

*/
var Scene = document.getElementById("mainScene");
var Model = function () {
    this.arr = [];
    this.initTable();
    this.pos = {
        x : 100,
        y : 100
    };
};
Model.prototype.initTable =  function()
{
    var EX = Math.floor(Math.random() * (3 - 0 + 1));
    var EY = Math.floor(Math.random() * (3 - 0 + 1));
    var mass = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    var index = Math.floor(Math.random()*((mass.length-1)- 0));
    //Заполняем массив arr числами от 1-16
    for(i = 0; i < 4; ++i){
		this.arr[i] = [];
		for(j = 0; j < 4; ++j){
            if(i!=EX|j!=EY)
            {
                this.arr[i][j] = mass[index];
                var indelem = mass.indexOf(mass[index]);
                if (indelem > -1) {
                    mass.splice(indelem, 1);
                }
                index = Math.floor(Math.random()*((mass.length-1) - 0));
            }
            else 
            {
                this.arr[i][j] = "";
            }
		}
    }	
}
Model.prototype.init = function(renderFunction){
    this.initTable();
    this.needRendering = renderFunction;
};

Model.prototype.check = function(x,y,text) {
    var up,down,left,rigth;
    var pos1 =  x;
    var pos2 =  y;
    up = x - 1;
    down = x + 1;
    left = y - 1;
    rigth = y + 1;
    if(up>=0&up<=3)
    {
        if(this.arr[up][pos2]=="") {this.arr[pos1][pos2] = "",this.arr[up][pos2] = text} //this.pos.x = up,this.pos.y = pos2}
    }
    if(down>=0&down<=3)
    {
        if(this.arr[down][pos2]=="") {this.arr[pos1][pos2] = "",this.arr[down][pos2] = text}// this.pos.x = down,this.pos.y = pos2}
    }
    if(left>=0&left<=3)
    {
        if(this.arr[pos1][left]=="") {this.arr[pos1][pos2] = "",this.arr[pos1][left] = text}// this.pos.x = pos1,this.pos.y = left}
    }
    if(rigth>=0&rigth<=3)
    {
        if(this.arr[pos1][rigth]=="") {this.arr[pos1][pos2] = "",this.arr[pos1][rigth] = text}// this.pos.x = pos1,this.pos.y = rigth}
    }
}


Model.prototype.pyatnashkiMove = function(e){
    var mouse = {
        x:  Math.trunc((e.clientX - Scene.offsetLeft) / 63),
        y: Math.trunc((e.clientY - Scene.offsetLeft) / 63)
    }
    console.log(mouse.y+" "+mouse.x);
    this.check(mouse.y,mouse.x,Number(this.arr[mouse.y][mouse.x]));
}
