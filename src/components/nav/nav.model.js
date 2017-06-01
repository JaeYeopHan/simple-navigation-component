var NavService = require('./nav.service');

function NavModel (api, navOption) {
    this._navService = new NavService(api);

    this._MAX_TODO_COUNT_OF_PAGE = navOption.countOfItem;
    this._MAX_INDEX_NUM = navOption.countOfIndex;

    this.pages;
    this.postOverIndex;
}

NavModel.prototype.getRenderOption = function() {
    return {
        pages: this.pages,
        postOverIndex: this.postOverIndex
    };
};

NavModel.prototype.setRenderOption = function(renderOption) {
    this.pages = renderOption.pages;
    this.isOverIndex = renderOption.postOverIndex;
};

NavModel.prototype.init = function() {
    return this._navService.getCountOfTodos().then(function(countObj) {
        var renderOption = this._getPages.call(this, countObj.cnt);
        this.setRenderOption(renderOption);
    }.bind(this)).catch(function(err) {
        console.error(err);
    });
};

NavModel.prototype._getPages = function(count) {
    var pages = [];
    var pageNum = count / this._MAX_TODO_COUNT_OF_PAGE;
    var postOverIndex = false;
    if (pageNum > this._MAX_INDEX_NUM) {
        for (var i = 1; i <= this._MAX_INDEX_NUM; i++) {
            pages.push({ num: i });
            postOverIndex = true;
        }
    } else {
        for (var i = 1; i <= pageNum + 1; i++) {
            pages.push({ num: i });
        }
    }

    return {
        pages: pages,
        postOverIndex: postOverIndex
    };
};

module.exports = NavModel;
