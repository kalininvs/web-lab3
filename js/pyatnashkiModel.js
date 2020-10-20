/*

Pyatnashki model

*/

const INITIAL_PYATNASHKI_XE = 0;
const INITIAL_PYATNASHKI_YE = 0;
const INITIAL_PYATNASHKI_X = 0;
const INITIAL_PYATNASHKI_Y = 0;
// const UP_BORDER=0;
// const DOWN_BORDER=500;
// const LEFT_BORDER = 0;
// const RIGHT_BORDER = 650;
// const KILLER_HEIGHT = 15;
// const ENEMY_HEIGHT = 30;
// const KEY_CODE_UP = 38;
// const KEY_CODE_DOWN = 40;
// const KEY_CODE_LEFT = 37;
// const KEY_CODE_RIGHT = 39;
// const PERSON_STEP = 50;
// const PERSON_STEP_DOWN =20;
// const ENEMY_STEP = 5;
const ROAD=[60,320,600];
var arr = [];
var Scene = document.getElementById("mainScene");
var PyatnashkiID = null;

var Model = function () {
    this.objs = {
        'pyatnashkiEmpty': {
            x: INITIAL_PYATNASHKI_XE,
            y: INITIAL_PYATNASHKI_YE,
            number : 0
        },
        'pyatnashkiNoEmpty': {
            x: INITIAL_PYATNASHKI_X,
            y: INITIAL_PYATNASHKI_Y,
            number : 0
        }
    };
};
Model.prototype.loadTable =  function()
{
    var EX = Math.floor(Math.random() * (3 - 0 + 1));
    var EY = Math.floor(Math.random() * (3 - 0 + 1));
    var mass = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    var index = Math.floor(Math.random()*((mass.length-1)- 0));
    //Заполняем массив arr числами от 1-16
    for(i = 0; i < 4; ++i){
		arr[i] = [];
		for(j = 0; j < 4; ++j){
            if(i!=EX|j!=EY)
            {
                arr[i][j] = mass[index];
                var indelem = mass.indexOf(mass[index]);
                if (indelem > -1) {
                    mass.splice(indelem, 1);
                }
                index = Math.floor(Math.random()*((mass.length-1) - 0));
            }
            else 
            {
                arr[i][j] = "";
            }
		}
    }
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
}
Model.prototype.init = function(renderFunction){
    this.loadTable();
    this.needRendering = renderFunction;
};
Model.prototype.setCoords = function (obj, x, y,number,objEmpty, xEmpty, yEmpty,numberEmpty) {
    obj.x = x;
    obj.y = y;
    obj.number = number;
    objEmpty.x = xEmpty;
    objEmpty.y = yEmpty;
    objEmpty.number = numberEmpty;
    this.needRendering();
};

Model.prototype.check = function(x,y,text) {
    var position = x+y;
    if(position == '00' || position == '03' || position == '30' || position == '33')
    {
        switch(position)
        {
            case '00' : 
            { 
                if(arr[0][1]=="") {arr[0][0] = "",arr[0][1] = text, this.setCoords(this.objs.pyatnashkiNoEmpty,0,1,text,this.objs.pyatnashkiEmpty,0,0,"");};
                if(arr[1][0]=="") {arr[0][0] = "",arr[1][0] = text, this.setCoords(this.objs.pyatnashkiNoEmpty,1,0,text,this.objs.pyatnashkiEmpty,0,0,"");}; break;
            };
            case '03' : 
            { 
                if(arr[0][2]=="") {arr[0][3] = "",arr[0][2] = text, this.setCoords(this.objs.pyatnashkiNoEmpty,0,2,text,this.objs.pyatnashkiEmpty,0,3,""); };
                if(arr[1][3]=="") {arr[0][3] = "",arr[1][3] = text, this.setCoords(this.objs.pyatnashkiNoEmpty,1,3,text,this.objs.pyatnashkiEmpty,0,3,"");}; break;
            };
            case '30' : 
            { 
                if(arr[2][0]=="") {arr[3][0] = "",arr[2][0] = text, this.setCoords(this.objs.pyatnashkiNoEmpty,2,0,text,this.objs.pyatnashkiEmpty,3,0,"");};
                if(arr[3][1]=="") {arr[3][0] = "",arr[3][1] = text, this.setCoords(this.objs.pyatnashkiNoEmpty,3,1,text,this.objs.pyatnashkiEmpty,3,0,"");}; break;
            };
            case '33' : 
            { 
                if(arr[2][3]=="") {arr[3][3] = "",arr[2][3] = text, this.setCoords(this.objs.pyatnashkiNoEmpty,2,3,text,this.objs.pyatnashkiEmpty,3,3,""); };
                if(arr[3][2]=="") {arr[3][3] = "",arr[3][2] = text, this.setCoords(this.objs.pyatnashkiNoEmpty,3,2,text,this.objs.pyatnashkiEmpty,3,3,""); }; break;
            };

        }
    }
    else if(position[1] == '0' || position[1] == '3')
    {
        switch(position[1])
        {
            case '0' : 
            { 
                var pos1 = Number(position[0]);
                var pos2 = Number(position[1]);
                var up = Number(position[0])-1;
                var down = Number(position[0])+1;
                var rigth = Number(position[1])+1;
                if(arr[up][0]=="") {arr[pos1][0] = "",arr[up][0] = text, this.setCoords(this.objs.pyatnashkiNoEmpty,up,0,text,this.objs.pyatnashkiEmpty,pos1,0,""); };
                if(arr[pos1][rigth]=="") {arr[pos1][0] = "",arr[pos1][rigth] = text, this.setCoords(this.objs.pyatnashkiNoEmpty,pos1,rigth,text,this.objs.pyatnashkiEmpty,pos1,0,""); };
                if(arr[down][0]=="") {arr[pos1][0] = "",arr[down][0] = text,this.setCoords(this.objs.pyatnashkiNoEmpty,down,0,text,this.objs.pyatnashkiEmpty,pos1,0,""); }; break;
            };
            case '3' : 
            { 
                var pos1 = Number(position[0]);
                var pos2 = Number(position[1]);
                var up = Number(position[0])-1;
                var down = Number(position[0])+1;
                var left = Number(position[1])-1;
                if(arr[up][3]=="") {arr[pos1][3] = "",arr[up][3] = text,this.setCoords(this.objs.pyatnashkiNoEmpty,up,3,text,this.objs.pyatnashkiEmpty,pos1,3,"");};
                if(arr[pos1][left]=="") {arr[pos1][3] = "",arr[pos1][left] = text, this.setCoords(this.objs.pyatnashkiNoEmpty,pos1,left,text,this.objs.pyatnashkiEmpty,pos1,3,""); };
                if(arr[down][3]=="") {arr[pos1][3] = "",arr[down][3] = text,this.setCoords(this.objs.pyatnashkiNoEmpty,down,3,text,this.objs.pyatnashkiEmpty,pos1,3,"");}; break;
            };
        }
    } else if (position[0] == '0' || position[0] == '3')
    {
        switch(position[0])
        {
            case '0' : 
            { 
                var pos1 = Number(position[0]);
                var pos2 = Number(position[1]);
                var down = pos1+1;
                var left = pos2-1;
                var rigth = pos2+1;
                if(arr[down][pos2]=="") {arr[0][pos2] = "",arr[down][pos2] = text, this.setCoords(this.objs.pyatnashkiNoEmpty,down,pos2,text,this.objs.pyatnashkiEmpty,0,pos2,""); };
                if(arr[pos1][left]=="") {arr[0][pos2] = "",arr[pos1][left] = text, this.setCoords(this.objs.pyatnashkiNoEmpty,pos1,left,text,this.objs.pyatnashkiEmpty,0,pos2,""); };
                if(arr[pos1][rigth]=="") {arr[0][pos2] = "",arr[pos1][rigth] = text,this.setCoords(this.objs.pyatnashkiNoEmpty,pos1,rigth,text,this.objs.pyatnashkiEmpty,0,pos2,""); }; break;
            }; 
            case '3' : 
            { 
                var pos1 = Number(position[0]);
                var pos2 = Number(position[1]);
                var up = pos1-1;
                var rigth = pos2+1;
                var left = pos2-1;
                if(arr[up][pos2]=="") {arr[3][pos2] = "",arr[up][pos2] = text,this.setCoords(this.objs.pyatnashkiNoEmpty,up,pos2,text,this.objs.pyatnashkiEmpty,3,pos2,"");};
                if(arr[pos1][left]=="") {arr[3][pos2] = "",arr[pos1][left] = text, this.setCoords(this.objs.pyatnashkiNoEmpty,pos1,left,text,this.objs.pyatnashkiEmpty,3,pos2,""); };
                if(arr[pos1][rigth]=="") {arr[3][pos2] = "",arr[pos1][rigth] = text,this.setCoords(this.objs.pyatnashkiNoEmpty,pos1,rigth,text,this.objs.pyatnashkiEmpty,3,pos2,"");}; break;
            };
        }
    }
    else 
    {
        var pos1 =  Number(position[0]);
        var pos2 =  Number(position[1]);
        var up = Number(position[0]) - 1;
        var down = Number(position[0]) + 1;
        var left = Number(position[1]) - 1;
        var rigth = Number(position[1]) + 1;
        if(arr[up][pos2]=="") {arr[pos1][pos2] = "",arr[up][pos2] = text,this.setCoords(this.objs.pyatnashkiNoEmpty,up,pos2,text,this.objs.pyatnashkiEmpty,pos1,pos2,"");};
        if(arr[down][pos2]=="") {arr[pos1][pos2] = "",arr[down][pos2] = text, this.setCoords(this.objs.pyatnashkiNoEmpty,down,pos2,text,this.objs.pyatnashkiEmpty,pos1,pos2,""); };
        if(arr[pos1][left]=="") {arr[pos1][pos2] = "",arr[pos1][left] = text,this.setCoords(this.objs.pyatnashkiNoEmpty,pos1,left,text,this.objs.pyatnashkiEmpty,pos1,pos2,"");};
        if(arr[pos1][rigth]=="") {arr[pos1][pos2] = "",arr[pos1][rigth] = text, this.setCoords(this.objs.pyatnashkiNoEmpty,pos1,rigth,text,this.objs.pyatnashkiEmpty,pos1,pos2,"");};
    }
}
Model.prototype.getCoords = function (obj) {
    return {
        x: obj.x,
        y: obj.y,
        number : obj.number
    }
};

Model.prototype.pyatnashkiMove = function(e,sound){
    var el = e.toElement;
    var id = el.id; //позиция в массиве
    var text = el.innerHTML; //содержимое ячейки
    this.check(id[0],id[2],Number(text));
    //console.log("NOEMPTY= "+this.getCoords(pyatnashkiModel.objs.pyatnashkiNoEmpty).x + " "+ this.getCoords(pyatnashkiModel.objs.pyatnashkiNoEmpty).y);
    //console.log("EMPTY= "+this.getCoords(pyatnashkiModel.objs.pyatnashkiEmpty).x + " "+ this.getCoords(pyatnashkiModel.objs.pyatnashkiEmpty).y);
};
var pyatnashkiModel = new Model();