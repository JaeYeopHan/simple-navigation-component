var $ = require('jquery');
var navTemplate = require('./nav.hbs');

function NavView(eventEmitter, root) {
    this.root = root;
    this.eventEmitter = eventEmitter;
    this._currentIndex = 1;
    this._ONEPAGE_TODO_MAX_COUNT = 3; //TODO 외부에서 주입받기
    this._init();
}

NavView.prototype.onClickPageNav = function(e) {
    e.preventDefault();
    var index = $(e.target).text();
    this._currentIndex = parseInt(index);
    var renderOption = {
        index: index,
        max: this._ONEPAGE_TODO_MAX_COUNT
    };
    this.eventEmitter.emit('changePage', renderOption);
    this.navSelected();
};

NavView.prototype.onClickPrevBtn = function(e) {
    e.preventDefault();
    this._currentIndex -= 1;
    if (this._currentIndex < 0) {

    }
    var renderOption = {
        index: this._currentIndex,
        max: this._ONEPAGE_TODO_MAX_COUNT
    };
    this.eventEmitter.emit('changePage', renderOption);
    this.navSelected();
};

NavView.prototype.onClickPostBtn = function(e) {
    e.preventDefault();
    this._currentIndex += 1;
    if (this._currentIndex > 5) {

    }
    var renderOption = {
        index: this._currentIndex,
        max: this._ONEPAGE_TODO_MAX_COUNT
    };
    this.eventEmitter.emit('changePage', renderOption);
    this.navSelected();
};

NavView.prototype.navSelected = function() {
    Array.from($('.page-nav')).forEach(function(target) {
        var $target = $(target);
        $target.parent().removeClass('active');
        if ($target.text() == this._currentIndex) {
            $target.parent().addClass('active');
        }
    }.bind(this));
};

NavView.prototype.renderNav = function(pages) {
    var pages = pages || [{ num: 1 }];
    $(this.root).html(navTemplate({ page: pages }));
    this.navSelected();
};

NavView.prototype._init = function() {
    $(this.root).on('click', function(e) {
        var target = e.target;
        if (target.matches('.page-nav')) {
            this.onClickPageNav(e);
        } else if (target.matches('#prevBtn')) {
            this.onClickPrevBtn(e);
        } else if (target.matches('#postBtn')) {
            this.onClickPostBtn(e);
        }
    }.bind(this));
};

module.exports = NavView;
