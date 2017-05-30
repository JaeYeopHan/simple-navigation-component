var $ = require('jquery');

function TodoService() {
    this._api = 'http://128.199.76.9:8002/jbee/todo';
}

TodoService.prototype.getTodoCount = function() {
    return $.get(this._api + '/count');
};

TodoService.prototype.getTodosOfPage = function(num) {
    return $.get(this._api + '/page?start=' + num + '&limit=3');
};

module.exports = TodoService;
