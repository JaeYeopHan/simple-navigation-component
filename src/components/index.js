var ListComponent = require('./list');
var NavComponent = require('./nav');

module.exports = function Components() {
    var api = 'http://128.199.76.9:8002/jbee/todo';

    //
    // @param [required] api (fetch data url)
    // @param [required] selector
    // @param listOption
    //      default set
    //      countOfItem: 3
    // Events in list component supported by default
    // - render
    //      @param { index: num, max: num }

    // Sample
    // var list = new ListComponent(api, '#list', {
    //     countOfItem: 5
    // });

    var list = new ListComponent(api, '#list');


    // @param [required] api (fetch data url)
    // @param [required] selector
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
        list.render(data);
    });
};
