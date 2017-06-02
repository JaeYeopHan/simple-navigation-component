var $ = require('jquery');
var navTemplate = require('./nav.hbs');

function NavView(eventEmitter, root, navOption) {
    this.root = root;
    this.eventEmitter = eventEmitter;
    this._DEFAULT_INDEX = 1;
    this._curIdx = this._DEFAULT_INDEX;
    this._IDX_COUNT = navOption.countOfIndex;

    this._init();
}

NavView.prototype._onClickIndex = function(e) {
    e.preventDefault();
    var index = parseInt($(e.target).text());
    this._curIdx = index;
    this.eventEmitter.emit('buildNav', index);
    this._controlNav();
};

NavView.prototype._onClickNavBtn = function(e, controlCurrentIndex) {
    e.preventDefault();
    if ($(e.target).closest('li').hasClass('disabled')) {
        return;
    }
    controlCurrentIndex();

    this.eventEmitter.emit('buildNav', this._curIdx);
    this._controlNav();
};

NavView.prototype._renderNav = function(renderOption) {
    var renderOption = renderOption || [{ num: 1, maxIndex: 1 }];
    this._MAX = renderOption.maxIndex;
    $(this.root).html(navTemplate({ pages: renderOption.pages }));
    this._controlNav();
};

NavView.prototype._controlNav = function() {
    this._navSelected();
    this._ableCheck('#prevBtn', this._curIdx === this._DEFAULT_INDEX);
    this._ableCheck('#nextBtn', this._curIdx === this._MAX);
    this._ableCheck('#prevPageBtn', this._curIdx <= this._IDX_COUNT);
    this._ableCheck('#nextPageBtn', (this._curIdx + this._IDX_COUNT - 1 > this._MAX));
};

NavView.prototype._navSelected = function() {
    Array.from($('.page-nav')).forEach(function(target) {
        var $target = $(target);
        $target.parent().removeClass('active');
        if (parseInt($target.text()) === this._curIdx) {
            $target.parent().addClass('active');
        }
    }.bind(this));
};

NavView.prototype._ableCheck = function(target, condition) {
    var navBtn = $(target).parent();
    (condition) ? navBtn.addClass('disabled') : navBtn.removeClass('disabled');
};

NavView.prototype._init = function() {
    $(this.root).on('click', function(e) {
        var target = e.target;
        if (target.matches('.page-nav')) {
            this._onClickIndex(e);
        } else if (target.matches('#prevBtn')) {
            this._onClickNavBtn(e, function() {
                this._curIdx -= this._DEFAULT_INDEX;
            }.bind(this));
        } else if (target.matches('#nextBtn')) {
            this._onClickNavBtn(e, function() {
                this._curIdx += this._DEFAULT_INDEX;
            }.bind(this));
        } else if (target.matches('#prevPageBtn')) {
            this._onClickNavBtn(e, function() {
                this._curIdx -= (this._curIdx - 1) % this._IDX_COUNT + this._IDX_COUNT;
            }.bind(this));
        } else if (target.matches('#nextPageBtn')) {
            this._onClickNavBtn(e, function() {
                this._curIdx += this._IDX_COUNT - ((this._curIdx - 1) % this._IDX_COUNT);
            }.bind(this));
        }
    }.bind(this));
};

module.exports = NavView;
