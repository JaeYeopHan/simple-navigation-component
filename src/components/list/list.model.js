import ListService from './list.service';

function ListModel(api, listOption) {
    this._listService = new ListService(api);
    this.TODO_COUNT = listOption.countOfItem;

    this.todoModel = [];
}

ListModel.prototype.getTodos = function(index) {
    return this.todoModel[index];
};

ListModel.prototype.setTodos = function(index, todos) {
    this.todoModel[index] = todos;
};

ListModel.prototype.fetchTodos = function(index) {
    const startNum = (index - 1) * this.TODO_COUNT;
    return this._listService.getTodosOfPage(startNum, this.TODO_COUNT)
        .then(function(todos) {
            this.setTodos(index, todos);
        }.bind(this)).catch(function(err) {
            console.error(err);
        });
};

module.exports = ListModel;
