var NavService = require('./nav.service');

function NavModel (api, navOption) {
    this._navService = new NavService(api);

    this._MAX_TODO_COUNT_OF_PAGE = navOption.countOfItem;
    this._MAX_INDEX_NUM = navOption.countOfIndex;

    this.pages;
    this.postOverIndex;
}

NavModel.prototype.getPages = function(index) {
    var maxIndex = (parseInt(index / this._MAX_INDEX_NUM) + 1) * 5;
    var pages = [];
    for (var i = index - 1; i < maxIndex; i++) {
        if (this.pages[i] !== undefined) {
            pages.push(this.pages[i]);
        }
    }
    return pages;
};

NavModel.prototype.setRenderOption = function(renderOption) {
    this.pages = renderOption.pages;
    this.postOverIndex = renderOption.postOverIndex;
};

NavModel.prototype.init = function() {
    return this._navService.getCountOfTodos().then(function(countObj) {
        var renderOption = this._getIndexInfo.call(this, countObj.cnt);
        this.setRenderOption(renderOption);
    }.bind(this)).catch(function(err) {
        console.error(err);
    });
};

NavModel.prototype._getIndexInfo = function(count) {
    var pages = [];
    var totalCountOfPage = count / this._MAX_TODO_COUNT_OF_PAGE;
    var postOverIndex = false;
    if (totalCountOfPage > this._MAX_INDEX_NUM) {
        postOverIndex = true;
    }
    for (var i = 1; i <= totalCountOfPage + 1; i++) {
        pages.push({ num: i });
    }

    return {
        pages: pages,
        postOverIndex: postOverIndex
    };
};

module.exports = NavModel;
