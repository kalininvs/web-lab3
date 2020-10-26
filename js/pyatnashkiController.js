/*

Pyatnashki controller

*/

var Controller = function () {
    this.pyatnashkiModel =new Model();
    this.pyatnashkiView = new View(this.initRender.bind(this));
};

Controller.prototype.reset = function() {
    this.pyatnashkiModel.init();
    this.pyatnashkiView.tableFill(this.pyatnashkiModel,this.moving.bind(this));
};
Controller.prototype.initRender = function() {
    this.pyatnashkiView.init(this.pyatnashkiModel,this.moving.bind(this));
};
Controller.prototype.moving = function(e) {
    this.pyatnashkiModel.pyatnashkiMove(e,this.pyatnashkiView);
    this.pyatnashkiView.tableFill(this.pyatnashkiModel,this.moving.bind(this));
};
var pyatnashkiController = new Controller();