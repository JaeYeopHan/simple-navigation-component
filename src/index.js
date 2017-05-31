var ListComponent = require('./components/list');
var NavComponent = require('./components/nav');
var EventEmitter = require('event-emitter');

(function() {
    var api = 'http://128.199.76.9:8002/jbee/todo';
    var eventEmitter = new EventEmitter();

    //
    // @param api (fetch data url)
    // @param selector
    // @param eventEmitter
    //
    new ListComponent(api, '#list', eventEmitter);

    //
    // @param api (fetch data url)
    // @param selector
    // @param eventEmitter
    //
    new NavComponent(api, '#nav', eventEmitter);
}());
