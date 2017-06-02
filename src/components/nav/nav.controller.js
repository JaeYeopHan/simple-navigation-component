var NavView = require('./nav.view');
var NavModel = require('./nav.model');
var EventEmitter = require('event-emitter');

function NavController(api, root, navOption) {
    this.navOption = navOption || {
            countOfItem: 3,
            countOfIndex: 5
    };

    this.eventEmitter = new EventEmitter();
    this._navModel = new NavModel(api, this.navOption);
    this._navView = new NavView(this.eventEmitter, root);

    this._DEFAULT_INDEX = 1;
    this._init();
}

NavController.prototype.buildNav = function(index) {
    var index = index || this._DEFAULT_INDEX;
    this._navView._renderNav(this._navModel.getPages(index));
};

NavController.prototype._init = function() {
    this._navModel.init().then(function() {
        this.buildNav();
    }.bind(this)).catch(function(err) {
        console.error(err);
    });
};

NavController.prototype.on = function(event, callback) {
    this.eventEmitter.on(event, callback);
};

module.exports = NavController;
