/*

Pyatnashki view

*/

var View = function() {
    this.pyatnashki = document.getElementById('mainScene');
    this.onKeyDownEvent = null;
};

View.prototype.init = function (){
    document.getElementById('mainScene').addEventListener('click', this.onKeyDownEvent);
};

View.prototype.render = function (objs) {
    document.getElementById('pyatnashki').rows[objs.pyatnashkiEmpty.x].cells[objs.pyatnashkiEmpty.y].innerHTML = objs.pyatnashkiEmpty.number;
    document.getElementById('pyatnashki').rows[objs.pyatnashkiNoEmpty.x].cells[objs.pyatnashkiNoEmpty.y].innerHTML = objs.pyatnashkiNoEmpty.number;
};

var pyatnashkiView = new View();