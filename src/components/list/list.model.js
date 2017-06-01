var ListService = require('./list.service');

function ListModel(api, listOption) {
    this._listService = new ListService(api);
    this._MAX_TODO_COUNT_OF_PAGE = listOption.countOfItem;

    this.todoModel = [];
}

ListModel.prototype.getTodos = function(index) {
    return this.todoModel[index];
};

ListModel.prototype.setTodos = function(index, todos) {
    this.todoModel[index] = todos;
};

ListModel.prototype.fetchTodos = function(index) {
    var startNum = (index - 1) * this._MAX_TODO_COUNT_OF_PAGE;
    return this._listService.getTodosOfPage(startNum, this._MAX_TODO_COUNT_OF_PAGE)
        .then(function(todos) {
            this.setTodos(index, todos);
        }.bind(this)).catch(function(err) {
        console.error(err);
    });
};

module.exports = ListModel;
