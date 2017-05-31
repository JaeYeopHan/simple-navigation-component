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
        var renderOption = this._getRenderOption.call(this, countObj.cnt);
        this._navView.renderNav({
            page: renderOption.result,
            prevDisable: renderOption.prevDisable,
            postDisable: renderOption.postDisable
        });
    }.bind(this)).catch(function(err) {
        console.error(err);
    });
};

NavController.prototype._getRenderOption = function(count) {
    var result = [];
    var pageNum = count / this._ONEPAGE_TODOCOUNT;
    var prevDisable = false;
    var postDisable = false;
    if (pageNum > this._MAX_PAGE_NUM) {
        for (var i = 1; i <= this._MAX_PAGE_NUM; i++) {
            result.push({ num: i });
            postDisable = true;
        }
    } else {
        for (var i = 1; i <= pageNum + 1; i++) {
            result.push({ num: i });
        }
    }

    return {
        result: result,
        prevDisable: prevDisable,
        postDisable: postDisable
    };
};

NavController.prototype._initView = function() {
    this.buildNav();
};

module.exports = NavController;
