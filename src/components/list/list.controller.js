import ListView from './list.view';
import ListModel from './list.model';
import EventEmitter from 'event-emitter';

class ListController {
    constructor(api, root, listOption) {
        this.listOption = listOption || {
                countOfItem: 3
            };

        this._eventEmitter = new EventEmitter();
        this._listModel = new ListModel(api, this.listOption);
        this._listView = new ListView(this._eventEmitter, root);

        this.DEFAULT_INDEX = 1;

        this._init();
    }

    render(renderOption) {
        var renderOption = renderOption || {
                index: this.DEFAULT_INDEX,
                max: this.listOption.countOfItem
            };

        if (this.listOption.countOfItem !== renderOption.max) {
            console.error('NotMatch renderOption!');
        }

        const todos = this._listModel.getTodos(renderOption.index);
        if (todos === undefined) {
            this._listModel.fetchTodos(renderOption.index).then(function() {
                this._listView.renderList(this._listModel.getTodos(renderOption.index));
            }.bind(this)).catch(function(err) {
                console.error(err);
            });
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
