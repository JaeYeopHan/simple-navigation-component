var NavView = require('./nav.view');
var NavModel = require('./nav.model');

function NavController(api, root, eventEmitter, navOption) {
    this.navOption = navOption || {
            countOfItem: 3,
            countOfIndex: 5
    };
    this._MAX_TODO_COUNT_OF_PAGE = this.navOption.countOfItem;
    this._MAX_INDEX_NUM = this.navOption.countOfIndex;

    this.eventEmitter = eventEmitter;
    this._navModel = new NavModel(api, this.navOption);
    this._navView = new NavView(this.eventEmitter, root, this.navOption);

    this._init();
}

NavController.prototype.buildNav = function() {
    var pages = this._navModel.getPages();
    this._navView.renderNav(pages);
};

NavController.prototype._init = function() {
    this._navModel.init().then(function() {
        this.buildNav();
    }.bind(this));
};

module.exports = NavController;
