var NavView = require('./nav.view');
var NavService = require('./nav.service');

function NavController(api, root, eventEmitter) {
    this.eventEmitter = eventEmitter;
    this._navView = new NavView(this.eventEmitter, root);
    this._navService = new NavService(api);

    this._ONEPAGE_TODO_MAX_COUNT = 3; //TODO 외부에서 주입받기
    this._MAX_INDEX_NUM = 5; //TODO 외부에서 주입받기

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
    var pageNum = count / this._ONEPAGE_TODO_MAX_COUNT;
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
