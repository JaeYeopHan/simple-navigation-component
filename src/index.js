var TodoController = require('./components/todo.controller.js');
var EventEmitter = require('event-emitter');

(function() {
    var eventEmitter = new EventEmitter();
    new TodoController(eventEmitter, '#list', '#nav');
}());
