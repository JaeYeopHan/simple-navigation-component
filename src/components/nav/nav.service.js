import $ from 'jquery';

class NavService {
    constructor(api) {
        this.api = api;
    }

    getCountOfTodos() {
        return $.get(`${this.api}/count`);
    }
}

export default NavService;
