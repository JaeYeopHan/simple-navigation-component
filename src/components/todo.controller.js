var TodoView = require('./todo.view.js');
var TodoService = require('./todo.service');

function TodoController(listRoot, navRoot) {
    this._todoView = new TodoView(listRoot, navRoot);
    this._todoService = new TodoService();
    this._initView();
};

TodoController.prototype._initView = function() {
    this._todoView.render();
};

TodoController.prototype.updateView = function() {
    this._todoView.render();
};

module.exports = TodoController;
