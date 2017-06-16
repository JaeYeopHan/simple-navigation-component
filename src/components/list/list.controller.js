import EventEmitter from 'event-emitter';
import ListView from './list.view';
import ListModel from './list.model';

class ListController {
    constructor(api, root, listOption = { countOfItem: 3 }) {
        this.listOption = listOption;

        this._eventEmitter = new EventEmitter();
        this._listModel = new ListModel(api, this.listOption);
        this._listView = new ListView(this._eventEmitter, root);

        this.DEFAULT_INDEX = 1;

        this._init();
    }

    render({ index, max } = { index: this.DEFAULT_INDEX, max: this.listOption.countOfItem }) {
        if (this.listOption.countOfItem !== max) {
            console.error('NotMatch renderOption!');
        }

        const todos = this._listModel.getTodos(index);
        if (todos === undefined) {
            this._listModel.fetchTodos(index).then(() => {
                this._listView.renderList(this._listModel.getTodos(index));
            }).catch(err => console.error(err));
        } else {
            this._listView.renderList(todos);
        }
    }

    _init() {
        this.render();
    }

    on(event, callback) {
        this._eventEmitter.on(event, callback);
    }
}

export default ListController;
