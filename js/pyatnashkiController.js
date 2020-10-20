/*

Pyatnashki controller

*/

var Controller = function (View, Model) {
    this.pyatnashkiView = View;
    this.pyatnashkiModel = Model;
    var start = false;
};

Controller.prototype.init = function() {
    this.pyatnashkiView.onKeyDownEvent = this.moving.bind(this);

    this.pyatnashkiView.init();
    this.pyatnashkiModel.init(this.needRendering.bind(this));
    this.needRendering();
};

Controller.prototype.moving = function(e,sound) {
    this.start = true;
    var el = e.toElement;
    var id = el.id;
    var inner = el.innerHTML;
    if(inner == "") { return;}
    // this.pyatnashkiModel.objs.x = id[0];
    // this.pyatnashkiModel.objs.y = id[2];
    this.pyatnashkiModel.pyatnashkiMove(e,this.pyatnashkiView.moveSound);
};

Controller.prototype.needRendering = function(){
    if(!this.start)return;
    this.pyatnashkiView.render(pyatnashkiModel.objs);
};
var pyatnashkiController = new Controller(pyatnashkiView, pyatnashkiModel);

pyatnashkiController.init();