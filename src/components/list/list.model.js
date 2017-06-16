import ListService from './list.service';

class ListModel {
    constructor(api, { countOfItem }) {
        this._listService = new ListService(api);
        this.TODO_COUNT = countOfItem;

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
            .then(({ data }) => {
                this.setTodos(index, data);
            }).catch(err => console.error(err));
    }
}

export default ListModel;
