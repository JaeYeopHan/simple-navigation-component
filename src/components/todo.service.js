var $ = require('jquery');

function TodoService(api) {
    this._api = api;
}

TodoService.prototype.getCountOfTodos = function() {
    return $.get(this._api + '/count');
};

TodoService.prototype.getTodosOfPage = function(num) {
    return $.get(this._api + '/page?start=' + num + '&limit=3');
};

module.exports = TodoService;
