var ListView = require('./list.view');
var ListModel = require('./list.model');
var EventEmitter = require('event-emitter');

function ListController(api, root, listOption) {
    this.listOption = listOption || {
        countOfItem: 3
    };

    this.eventEmitter = new EventEmitter();
    this._listModel = new ListModel(api, this.listOption);
    this._listView = new ListView(this.eventEmitter, root);

    this._DEFAULT_INDEX = 1;

    this._init();
}

ListController.prototype.changePage = function(index) {
    var index = index || this._DEFAULT_INDEX;
    var todos = this._listModel.getTodos(index);
    if (todos === undefined) {
        this._listModel.fetchTodos(index).then(function() {
            this._listView.renderList(this._listModel.getTodos(index));
        }.bind(this)).catch(function(err) {
            console.error(err);
        });
    } else {
        this._listView.renderList(todos);
    }
};

ListController.prototype._init = function() {
    this.changePage();
};

ListController.prototype.on = function(event, callback) {
    this.eventEmitter.on(event, callback);
};

module.exports = ListController;
