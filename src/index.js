var ListComponent = require('./components/list');
var NavComponent = require('./components/nav');
var EventEmitter = require('event-emitter');

(function() {
    var api = 'http://128.199.76.9:8002/jbee/todo';
    var eventEmitter = new EventEmitter();

    //
    // @param [required] api (fetch data url)
    // @param [required] selector
    // @param [required] eventEmitter
    // @param listOption
    //      default set
    //      countOfItem: 3
    //

    // Sample
    // new ListComponent(api, '#list', eventEmitter, {
    //     countOfItem: 5
    // });
    new ListComponent(api, '#list', eventEmitter);

    //
    // @param [required] api (fetch data url)
    // @param [required] selector
    // @param [required] eventEmitter
    // @param navOption
    //      default set
    //      countOfItem: 3
    //      countOfIndex: 5

    // Sample
    // new NavComponent(api, '#nav', eventEmitter, {
    //     countOfItem: 5,
    //     countOfIndex: 3
    // });
    new NavComponent(api, '#nav', eventEmitter);

}());
