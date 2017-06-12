import axios from 'axios';

class NavService {
    constructor(api) {
        this.api = api;
    }

    getCountOfTodos() {
        return axios.get(`${this.api}/count`);
    }
}

export default NavService;
