import $ from 'jquery';
import listTemplate from './list.hbs';

function ListView(eventEmitter, root) {
    this.root = root;
    this._eventEmitter = eventEmitter;
}

ListView.prototype.renderList = function(todos) {
    var todos = todos || { id: 1, todo: 'todos가 없습니다.' };
    $(this.root).html(listTemplate({ todos: todos }));
};

module.exports = ListView;
