var ListView = require('./list.view');
var ListService = require('./list.service');

function ListController(api, root, eventEmitter) {
    this.eventEmitter = eventEmitter;
    this._listView = new ListView(this.eventEmitter, root);
    this._listService = new ListService(api);

    this._DEFAULT_PAGE_NUM = 1;

    this._initView();
    this._attachEvent();
}

ListController.prototype.changePage = function(index) {
    var index = index || this._DEFAULT_PAGE_NUM;
    var startNum = (index - 1) * 3;
    this._listService.getTodosOfPage(startNum, 3)
        .then(function(todos) {
            this._listView.renderList(todos);
        }.bind(this)).catch(function(err) {
            console.log(err);
        });
};

ListController.prototype._initView = function() {
    this.changePage();
};

ListController.prototype._attachEvent = function() {
    this.eventEmitter.on('changePage', this.changePage.bind(this));
};

module.exports = ListController;
