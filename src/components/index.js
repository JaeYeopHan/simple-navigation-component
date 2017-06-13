import ListComponent from './list';
import NavComponent from './nav';
import config from '../../config';

export default function Components() {
    const api = config.api;

    // @param [required] api (fetch data url)
    // @param [required] selector
    // @param listOption
    //      default set
    //      countOfItem: 3
    // Events in list component supported by default
    // - render
    //      @param { index: num, max: num }

    // Sample
    // const list = new ListComponent(api, '#list', {
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
    // const nav = new NavComponent(api, '#nav', {
    //     countOfItem: 5,
    //     countOfIndex: 3
    // });

    const nav = new NavComponent(api, '#nav');
    nav.on('buildNav', function (data) {
        list.render(data);
    });
};
