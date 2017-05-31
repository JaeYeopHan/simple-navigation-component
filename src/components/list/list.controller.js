var ListView = require('./list.view');
var ListService = require('./list.service');

function ListController(api, root, eventEmitter) {
    this.eventEmitter = eventEmitter;
    this._listView = new ListView(this.eventEmitter, root);
    this._listService = new ListService(api);

    this._ONEPAGE_TODOCOUNT = 3;
    this._DEFAULT_PAGE_NUM = 1;

    this._initView();
    this._attachEvent();
}

ListController.prototype.updateViewOfPage = function(num) {
    var startNum = (num - 1) * this._ONEPAGE_TODOCOUNT;
    this._listService.getTodosOfPage(startNum).then(function(todos) {
        this._listView.renderList(todos);
    }.bind(this)).catch(function(err) {
        console.log(err);
    });
};

ListController.prototype._initView = function() {
    this.updateViewOfPage(this._DEFAULT_PAGE_NUM);
};

ListController.prototype._attachEvent = function() {
    this.eventEmitter.on('changePage', this.updateViewOfPage.bind(this));
};

module.exports = ListController;
