var NavView = require('./nav.view');
var NavModel = require('./nav.model');
var EventEmitter = require('event-emitter');

function NavController(api, root, navOption) {
    this.navOption = navOption || {
        countOfItem: 3,
        countOfIndex: 5
    };

    this._eventEmitter = new EventEmitter();
    this._navModel = new NavModel(api, this.navOption);
    this._navView = new NavView(this._eventEmitter, root, this.navOption);

    this.DEFAULT_INDEX = 1;

    this._init();
}

NavController.prototype.buildNav = function(renderOption) {
    var renderOption = renderOption || {
        index: this.DEFAULT_INDEX,
        max: this.navOption.countOfItem
    };
    this._navView.renderNav(this._navModel.getPages(renderOption.index));
};

NavController.prototype._init = function() {
    this._navModel.init().then(function() {
        this.buildNav();
    }.bind(this)).catch(function(err) {
        console.error(err);
    });
};

NavController.prototype.on = function(event, callback) {
    this._eventEmitter.on(event, callback);
};

module.exports = NavController;
