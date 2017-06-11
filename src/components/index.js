import ListComponent from './list';
import NavComponent from './nav';

export default function Components() {
    const api = 'http://128.199.76.9:8002/jbee/todo';

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

    const list = new ListComponent(api, '#list');


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

    const nav = new NavComponent(api, '#nav');
    nav.on('buildNav', function(data) {
        list.render(data);
    });
};
