import axios from 'axios';

function ListService(api) {
    this._api = api;
}

ListService.prototype.getTodosOfPage = function(num, count) {
    return axios.get(this._api + '/page?start=' + num + '&limit=' + count);
};

module.exports = ListService;
