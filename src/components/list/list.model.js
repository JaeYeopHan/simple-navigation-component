import ListService from './list.service';

class ListModel {
    constructor(api, listOption) {
        this._listService = new ListService(api);
        this.TODO_COUNT = listOption.countOfItem;

        this.todoModel = [];
    }

    getTodos(index) {
        return this.todoModel[index];
    }

    setTodos(index, todos) {
        this.todoModel[index] = todos;
    }

    fetchTodos(index) {
        const startNum = (index - 1) * this.TODO_COUNT;
        return this._listService.getTodosOfPage(startNum, this.TODO_COUNT)
            .then(function({ data }) {
                this.setTodos(index, data);
            }.bind(this)).catch(function(err) {
                console.error(err);
            });
    }
}

export default ListModel;
