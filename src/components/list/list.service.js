import $ from 'jquery';

function ListService(api) {
    this._api = api;
}

ListService.prototype.getTodosOfPage = function(num, count) {
    return $.get(this._api + '/page?start=' + num + '&limit=' + count);
};

module.exports = ListService;
