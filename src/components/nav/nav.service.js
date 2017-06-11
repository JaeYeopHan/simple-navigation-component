import $ from 'jquery';

function NavService(api) {
    this._api = api;
}

NavService.prototype.getCountOfTodos = function() {
    return $.get(this._api + '/count');
};

export default NavService;
