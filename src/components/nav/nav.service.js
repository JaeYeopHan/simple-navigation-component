import $ from 'jquery';

class NavService {
    constructor(api) {
        this._api = api;
    }

    getCountOfTodos() {
        return $.get(this._api + '/count');
    }
}

export default NavService;
