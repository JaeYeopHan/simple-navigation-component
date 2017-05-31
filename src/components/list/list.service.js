var $ = require('jquery');

function ListService(api) {
    this._api = api;
}

ListService.prototype.getTodosOfPage = function(num) {
    return $.get(this._api + '/page?start=' + num + '&limit=3');
};

module.exports = ListService;
