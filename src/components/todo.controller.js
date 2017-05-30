var TodoView = require('./todo.view.js');

function TodoController(listRoot, navRoot) {
    this._todoView = new TodoView(listRoot, navRoot);
    this.initView();
};

TodoController.prototype.initView = function() {
    this._todoView.render();
};

TodoController.prototype.updateView = function() {
    this._todoView.render();
};

module.exports = TodoController;
