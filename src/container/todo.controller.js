var TodoView = require('../components/todo.view')

function TodoController(listRoot, navRoot) {
    this._todoView = new TodoView(listRoot, navRoot);
    this.initView();
};

TodoController.prototype.initView = function() {
    this._todoView.render();
};


module.exports = TodoController;
