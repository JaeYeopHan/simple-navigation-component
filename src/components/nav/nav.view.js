var $ = require('jquery');
var navTemplate = require('./nav.hbs');

function NavView(eventEmitter, root, navOption) {
    this.root = root;
    this._eventEmitter = eventEmitter;
    this.DEFAULT_INDEX = 1;
    this.curIdx = this.DEFAULT_INDEX;
    this.IDX_COUNT = navOption.countOfIndex;
    this.TODO_COUNT = navOption.countOfItem;

    this._init();
}

NavView.prototype.onClickIndex = function(e) {
    e.preventDefault();
    this.curIdx = parseInt($(e.target).text());
    this._eventEmitter.emit('buildNav', {
        index: this.curIdx,
        max: this.TODO_COUNT
    });
    this.controlNav();
};

NavView.prototype.onClickNavBtn = function(e, changeCurIdx) {
    e.preventDefault();
    if ($(e.target).closest('li').hasClass('disabled')) {
        return;
    }
    this.curIdx = changeCurIdx();
    this._eventEmitter.emit('buildNav', {
        index: this.curIdx,
        max: this.TODO_COUNT
    });
    this.controlNav();
};

NavView.prototype.renderNav = function(renderOption) {
    var renderOption = renderOption || [{ num: 1, maxIndex: 1 }];
    this._MAX = renderOption.maxIndex;
    $(this.root).html(navTemplate({ pages: renderOption.pages }));
    this.controlNav();
};

NavView.prototype.controlNav = function() {
    this.navSelected();
    this.ableCheck('#prevBtn', this.curIdx === this.DEFAULT_INDEX);
    this.ableCheck('#nextBtn', this.curIdx === this._MAX);
    this.ableCheck('#prevPageBtn', this.curIdx <= this.IDX_COUNT);
    var isAbleToNext = parseInt((this.curIdx - 1) / this.IDX_COUNT + 1) * this.IDX_COUNT;
    this.ableCheck('#nextPageBtn', (isAbleToNext > this._MAX));
};

NavView.prototype.navSelected = function() {
    Array.from($('.page-nav')).forEach(function(target) {
        var $target = $(target);
        $target.parent().removeClass('active');
        if (parseInt($target.text()) === this.curIdx) {
            $target.parent().addClass('active');
        }
    }.bind(this));
};

NavView.prototype.ableCheck = function(target, condition) {
    var navBtn = $(target).parent();
    (condition) ? navBtn.addClass('disabled') : navBtn.removeClass('disabled');
};

NavView.prototype._init = function() {
    $(this.root).on('click', function(e) {
        var target = e.target;
        if (target.matches('.page-nav')) {
            this.onClickIndex(e);
        } else if (target.matches('#prevBtn')) {
            this.onClickNavBtn(e, function() {
                return this.curIdx - this.DEFAULT_INDEX;
            }.bind(this));
        } else if (target.matches('#nextBtn')) {
            this.onClickNavBtn(e, function() {
                return this.curIdx + this.DEFAULT_INDEX;
            }.bind(this));
        } else if (target.matches('#prevPageBtn')) {
            this.onClickNavBtn(e, function() {
                var toPrevPage = (this.curIdx - 1) % this.IDX_COUNT + this.IDX_COUNT;
                return this.curIdx - toPrevPage;
            }.bind(this));
        } else if (target.matches('#nextPageBtn')) {
            this.onClickNavBtn(e, function() {
                var toNextPage = this.IDX_COUNT - ((this.curIdx - 1) % this.IDX_COUNT);
                return this.curIdx + toNextPage;
            }.bind(this));
        }
    }.bind(this));
};

module.exports = NavView;
