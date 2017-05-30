var TodoView = require('./todo.view.js');
var TodoService = require('./todo.service');

function TodoController(eventEmitter, listRoot, navRoot) {
    this.eventEmitter = eventEmitter;
    this._todoView = new TodoView(eventEmitter, listRoot, navRoot);
    this._todoService = new TodoService();

    this._initView();
    this._attachEvent();
};

TodoController.prototype.changePage = function(num) {
    console.log('TodoController.prototype.changePage::num: ', num);
};

TodoController.prototype._attachEvent = function() {
    this.eventEmitter.on('changePage', this.changePage.bind(this));
};

TodoController.prototype._initView = function() {
    this._todoView.renderList();
    this._todoView.renderNav();
};

TodoController.prototype._updateView = function() {
    this._todoView.renderList();
};

module.exports = TodoController;
