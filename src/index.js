var TodoController = require('./components/todo.controller.js');

(function() {
    var api = 'http://128.199.76.9:8002/jbee/todo';
    new TodoController(api, '#list', '#nav');
}());
