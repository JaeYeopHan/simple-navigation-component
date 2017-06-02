var ListComponent = require('./list');
var NavComponent = require('./nav');

module.exports = function Components() {
    var api = 'http://128.199.76.9:8002/jbee/todo';

    //
    // @param [required] api (fetch data url)
    // @param [required] selector
    // @param [required] eventEmitter
    // @param listOption
    //      default set
    //      countOfItem: 3

    // Sample
    // var list = new ListComponent(api, '#list', {
    //     countOfItem: 5
    // });

    var list = new ListComponent(api, '#list');


    //
    // @param [required] api (fetch data url)
    // @param [required] selector
    // @param [required] eventEmitter
    // @param navOption
    //      default set
    //      countOfItem: 3
    //      countOfIndex: 5

    // Sample
    // var nav = new NavComponent(api, '#nav', {
    //     countOfItem: 5,
    //     countOfIndex: 3
    // });

    var nav = new NavComponent(api, '#nav');
    nav.on('buildNav', function(data) {
        nav.buildNav.call(nav, data);
        list.changePage.call(list, data);
    });

};
