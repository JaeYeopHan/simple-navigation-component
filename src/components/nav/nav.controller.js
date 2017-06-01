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

    this._DEFAULT_INDEX = 1;
    this._init();
}

NavController.prototype._buildNav = function(index) {
    var index = index || this._DEFAULT_INDEX;
    this._navView._renderNav(this._navModel.getPages(index));
};

NavController.prototype._init = function() {
    this._navModel.init().then(function() {
        this._buildNav();
        this._attachEvent();
    }.bind(this)).catch(function(err) {
        console.error(err);
    });
};

NavController.prototype._attachEvent = function() {
    this.eventEmitter.on('buildNav', this._buildNav.bind(this));
};

module.exports = NavController;
