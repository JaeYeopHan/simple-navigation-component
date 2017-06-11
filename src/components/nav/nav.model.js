const NavService = require('./nav.service');

function NavModel(api, navOption) {
    this._navService = new NavService(api);

    this.TODO_COUNT = navOption.countOfItem;
    this.IDX_COUNT = navOption.countOfIndex;

    this.pages = [];
}

NavModel.prototype.getPages = function(index) {
    const base = parseInt((index - 1) / this.IDX_COUNT);
    const startIndex = base * this.IDX_COUNT;
    const endIndex = (base + 1) * this.IDX_COUNT;
    const result = [];
    for (let i = startIndex; i < endIndex; i++) {
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
        const renderOption = this.getIndexInfo.call(this, countObj.cnt);
        this.setRenderOption(renderOption);
    }.bind(this)).catch(function(err) {
        console.error(err);
    });
};

NavModel.prototype.getIndexInfo = function(count) {
    const pages = [];
    let maxIndex = parseInt(count / this.TODO_COUNT);
    if ((count % this.TODO_COUNT) !== 0) {
        maxIndex += 1;
    }
    for (let i = 1; i <= maxIndex; i++) {
        pages.push({ num: i });
    }

    return {
        pages: pages,
        maxIndex: maxIndex
    };
};

module.exports = NavModel;
