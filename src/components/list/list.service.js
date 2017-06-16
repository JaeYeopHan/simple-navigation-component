import axios from 'axios';

class ListService {
    constructor(api) {
        this._api = api;
    }

    getTodosOfPage(num, count) {
        return axios.get(this._api + '/page?start=' + num + '&limit=' + count);
    }
}

export default ListService;
