var NavView = require('./nav.view');
var NavService = require('./nav.service');

function NavController(api, root, eventEmitter) {
    this.eventEmitter = eventEmitter;
    this._navView = new NavView(this.eventEmitter, root);
    this._navService = new NavService(api);

    this._MAX_PAGE_NUM = 5;
    this._ONEPAGE_TODOCOUNT = 3;

    this._initView();
}

NavController.prototype.buildNav = function() {
    this._navService.getCountOfTodos().then(function(countObj) {
        var pages = this._getPages.call(this, countObj.cnt);
        this._navView.renderNav(pages);
    }.bind(this)).catch(function(err) {
        console.error(err);
    });
};

NavController.prototype._getPages = function(count) {
    var pages = [];
    var pageNum = count / this._ONEPAGE_TODOCOUNT;
    if (pageNum > this._MAX_PAGE_NUM) {
        for (var i = 1; i <= this._MAX_PAGE_NUM; i++) {
            pages.push({ num: i });
        }
    } else {
        for (var i = 1; i <= pageNum + 1; i++) {
            pages.push({ num: i });
        }
    }

    return pages;
};

NavController.prototype._initView = function() {
    this.buildNav();
};

module.exports = NavController;
