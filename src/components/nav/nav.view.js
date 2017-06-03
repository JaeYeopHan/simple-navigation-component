var $ = require('jquery');
var navTemplate = require('./nav.hbs');

function NavView(eventEmitter, root, navOption) {
    this.root = root;
    this._eventEmitter = eventEmitter;
    this.DEFAULT_INDEX = 1;
    this.curIdx = this.DEFAULT_INDEX;
    this.IDX_COUNT = navOption.countOfIndex;

    this._init();
}

NavView.prototype.onClickIndex = function(e) {
    e.preventDefault();
    var index = parseInt($(e.target).text());
    this.curIdx = index;
    this._eventEmitter.emit('buildNav', index);
    this.controlNav();
};

NavView.prototype.onClickNavBtn = function(e, controlCurrentIndex) {
    e.preventDefault();
    if ($(e.target).closest('li').hasClass('disabled')) {
        return;
    }
    controlCurrentIndex();

    this._eventEmitter.emit('buildNav', this.curIdx);
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
    var nextValue = parseInt((this.curIdx - 1) / this.IDX_COUNT + 1) * this.IDX_COUNT;
    this.ableCheck('#nextPageBtn', (nextValue > this._MAX));
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
                this.curIdx -= this.DEFAULT_INDEX;
            }.bind(this));
        } else if (target.matches('#nextBtn')) {
            this.onClickNavBtn(e, function() {
                this.curIdx += this.DEFAULT_INDEX;
            }.bind(this));
        } else if (target.matches('#prevPageBtn')) {
            this.onClickNavBtn(e, function() {
                this.curIdx -= (this.curIdx - 1) % this.IDX_COUNT + this.IDX_COUNT;
            }.bind(this));
        } else if (target.matches('#nextPageBtn')) {
            this.onClickNavBtn(e, function() {
                this.curIdx += this.IDX_COUNT - ((this.curIdx - 1) % this.IDX_COUNT);
            }.bind(this));
        }
    }.bind(this));
};

module.exports = NavView;
