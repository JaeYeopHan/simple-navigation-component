import ListView from './list.view';
import ListModel from './list.model';
import EventEmitter from 'event-emitter';

function ListController(api, root, listOption) {
    this.listOption = listOption || {
        countOfItem: 3
    };

    this._eventEmitter = new EventEmitter();
    this._listModel = new ListModel(api, this.listOption);
    this._listView = new ListView(this._eventEmitter, root);

    this.DEFAULT_INDEX = 1;

    this._init();
}

ListController.prototype.render = function(renderOption) {
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
};

ListController.prototype._init = function() {
    this.render();
};

ListController.prototype.on = function(event, callback) {
    this._eventEmitter.on(event, callback);
};

module.exports = ListController;
