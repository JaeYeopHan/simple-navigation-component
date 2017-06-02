var NavService = require('./nav.service');

function NavModel(api, navOption) {
    this._navService = new NavService(api);

    this._TODO_COUNT = navOption.countOfItem;
    this._IDX_COUNT = navOption.countOfIndex;

    this.pages;
}

NavModel.prototype.getPages = function(index) {
    var base = parseInt((index - 1) / this._IDX_COUNT);
    var startIndex = base * this._IDX_COUNT;
    var endIndex = (base + 1) * this._IDX_COUNT;
    var result = [];
    for (var i = startIndex; i < endIndex; i++) {
        if (this.pages[i] !== undefined) {
            result.push(this.pages[i]);
        }
    }
    return {
        pages: result,
        maxIndex: this.maxIndex
    };
};

NavModel.prototype.setRenderOption = function(renderOption) {
    this.pages = renderOption.pages;
    this.maxIndex = renderOption.maxIndex;
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
    var maxIndex = parseInt(count / this._TODO_COUNT);
    if ((count % this._TODO_COUNT) !== 0) {
        maxIndex += 1;
    }
    for (var i = 1; i <= maxIndex; i++) {
        pages.push({ num: i });
    }

    return {
        pages: pages,
        maxIndex: maxIndex
    };
};

module.exports = NavModel;
