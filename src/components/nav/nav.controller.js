var NavView = require('./nav.view');
var NavModel = require('./nav.model');

function NavController(api, root, eventEmitter, navOption) {
    this.navOption = navOption || {
            countOfItem: 3,
            countOfIndex: 5
    };

    this.eventEmitter = eventEmitter;
    this._navModel = new NavModel(api, this.navOption);
    this._navView = new NavView(this.eventEmitter, root, this.navOption);

    this.DEFAULT_INDEX = 1;
    this._init();
}

NavController.prototype.buildNav = function() {
    this._navView.renderNav(this._navModel.getPages(this.DEFAULT_INDEX));
};

NavController.prototype._init = function() {
    this._navModel.init().then(function() {
        this.buildNav();
    }.bind(this));
};

module.exports = NavController;
