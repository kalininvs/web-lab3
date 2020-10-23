/*

Pyatnashki model

*/

const INITIAL_PYATNASHKI_XE = 0;
const INITIAL_PYATNASHKI_YE = 0;
const INITIAL_PYATNASHKI_X = 0;
const INITIAL_PYATNASHKI_Y = 0;
var Scene = document.getElementById("mainScene");
var Model = function () {
    this.arr = [];
    this.initTable();
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
    var position = x+y;
    var up,down,left,rigth;
    var pos1 =  Number(position[0]);
    var pos2 =  Number(position[1]);
    up = Number(position[0]) - 1;
    down = Number(position[0]) + 1;
    left = Number(position[1]) - 1;
    rigth = Number(position[1]) + 1;
    if(up>=0&up<=3)
    {
        if(this.arr[up][pos2]=="") {this.arr[pos1][pos2] = "",this.arr[up][pos2] = text}
    }
    if(down>=0&down<=3)
    {
        if(this.arr[down][pos2]=="") {this.arr[pos1][pos2] = "",this.arr[down][pos2] = text}
    }
    if(left>=0&left<=3)
    {
        if(this.arr[pos1][left]=="") {this.arr[pos1][pos2] = "",this.arr[pos1][left] = text}
    }
    if(rigth>=0&rigth<=3)
    {
        if(this.arr[pos1][rigth]=="") {this.arr[pos1][pos2] = "",this.arr[pos1][rigth] = text}
    }
}


Model.prototype.pyatnashkiMove = function(e){
    var el = e.toElement;
    var id = el.id; //позиция в массиве
    var text = el.innerHTML; //содержимое ячейки
    this.check(id[0],id[2],Number(text));
}
