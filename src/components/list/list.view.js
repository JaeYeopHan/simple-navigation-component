var $ = require('jquery');
var listTemplate = require('./list.hbs');

function ListView(eventEmitter, root) {
    this.root = root;
    this.eventEmitter = eventEmitter;
}

ListView.prototype.renderList = function(todos) {
    var todos = todos || { id: 1, todo: 'todos가 없습니다.' };
    $(this.root).html(listTemplate({ todos: todos }));
};

module.exports = ListView;
