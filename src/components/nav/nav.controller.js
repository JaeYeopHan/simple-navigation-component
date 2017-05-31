var NavView = require('./nav.view');
var NavService = require('./nav.service');

function NavController(api, root, eventEmitter, navOption) {
    this.navOption = navOption || {
            countOfItem: 3,
            countOfIndex: 5
    };
    this.eventEmitter = eventEmitter;
    this._navView = new NavView(this.eventEmitter, root, this.navOption);
    this._navService = new NavService(api);
    this._MAX_TODO_COUNT_OF_PAGE = this.navOption.countOfItem;
    this._MAX_INDEX_NUM = this.navOption.countOfIndex;

    this._initView();
}

NavController.prototype.buildNav = function() {
    this._navService.getCountOfTodos().then(function(countObj) {
        var renderOption = this._getPages.call(this, countObj.cnt);
        this._navView.renderNav({
            pages: renderOption.pages,
            post: renderOption.post
        });
    }.bind(this)).catch(function(err) {
        console.error(err);
    });
};

NavController.prototype._getPages = function(count) {
    var pages = [];
    var pageNum = count / this._MAX_TODO_COUNT_OF_PAGE;
    var post = false;
    if (pageNum > this._MAX_INDEX_NUM) {
        for (var i = 1; i <= this._MAX_INDEX_NUM; i++) {
            pages.push({ num: i });
            post = true;
        }
    } else {
        for (var i = 1; i <= pageNum + 1; i++) {
            pages.push({ num: i });
        }
    }

    return {
        pages: pages,
        post: post
    };
};

NavController.prototype._initView = function() {
    this.buildNav();
};

module.exports = NavController;
