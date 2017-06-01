var NavView = require('./nav.view');
var NavModel = require('./nav.model');

function NavController(api, root, eventEmitter, navOption) {
    this.navOption = navOption || {
            countOfItem: 3,
            countOfIndex: 5
    };

    this.eventEmitter = eventEmitter;
    this._navModel = new NavModel(api, this.navOption);
    this._navView = new NavView(this.eventEmitter, root);
    this._MAX_TODO_COUNT_OF_PAGE = this.navOption.countOfItem;

    this._DEFAULT_INDEX = 1;
    this._init();
}

NavController.prototype.buildNav = function(renderOption) {
    var renderOption = renderOption || {
            index: this._DEFAULT_INDEX,
            max: this._MAX_TODO_COUNT_OF_PAGE
        };
    this._navView.renderNav(this._navModel.getPages(renderOption.index));
};

NavController.prototype._init = function() {
    this._navModel.init().then(function() {
        this.buildNav();
    }.bind(this));
    this._attachEvent();
};

NavController.prototype._attachEvent = function() {
    this.eventEmitter.on('buildNav', this.buildNav.bind(this));
};

module.exports = NavController;
