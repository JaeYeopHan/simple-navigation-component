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
    // @param [required] api (fetch data url)
    // @param [required] selector
    // @param [required] eventEmitter
    // @param navOption
    //      default set
    //      MAX_TODO_COUNT_OF_PAGE: 3
    //      MAX_INDEX_NUM: 5
    // Example
    // new NavComponent(api, '#nav', eventEmitter, {
    //     countOfItem: 5,
    //     countOfIndex: 3
    // });
    new NavComponent(api, '#nav', eventEmitter);

}());
