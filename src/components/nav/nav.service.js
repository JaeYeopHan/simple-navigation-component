const $ = require('jquery');

function NavService(api) {
    this._api = api;
}

NavService.prototype.getCountOfTodos = function() {
    return $.get(this._api + '/count');
};

module.exports = NavService;
