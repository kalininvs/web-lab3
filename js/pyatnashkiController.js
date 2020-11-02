/*

Pyatnashki controller

*/

var Controller = function () {
    this.pyatnashkiModel =new Model();
    this.pyatnashkiView = new View(this.initRender.bind(this));
};

Controller.prototype.reset = function() {
    this.pyatnashkiModel.init();
    var anim = this.pyatnashkiView.getAnimation();
    if(!anim)
    {
        this.pyatnashkiView.init(this.pyatnashkiModel,this.moving.bind(this));
    }
};
Controller.prototype.initRender = function() {
    this.pyatnashkiView.init(this.pyatnashkiModel,this.moving.bind(this));
};
Controller.prototype.moving = function(e) {
    
    var anim = this.pyatnashkiView.getAnimation();
    if(!anim)
    {
        this.pyatnashkiModel.pyatnashkiMove(e,this.pyatnashkiView);
        if(Object.keys(this.pyatnashkiModel.pos).length == 0) { return;}
        this.pyatnashkiView.animated(this.pyatnashkiModel,this.moving.bind(this));
    }
    
};
var pyatnashkiController = new Controller();