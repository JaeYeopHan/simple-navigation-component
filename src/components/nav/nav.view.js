var $ = require('jquery');
var navTemplate = require('./nav.hbs');

function NavView(eventEmitter, root) {
    this.root = root;
    this.eventEmitter = eventEmitter;
    this._currentIndex = 1;
    this._DEFAULT_INDEX = 1;

    this._init();
}

NavView.prototype.onClickIndex = function(e) {
    e.preventDefault();
    var index = parseInt($(e.target).text());
    this._currentIndex = index;
    this.eventEmitter.emit('changePage', index);//TODO Remove dependency
    this.eventEmitter.emit('buildNav', index);
    this.controlNav();
};

NavView.prototype.onClickNavBtn = function(e, controlCurrentIndex) {
    e.preventDefault();
    if ($(e.target).closest('li').hasClass('disabled')) {
        return;
    }
    controlCurrentIndex();

    this.eventEmitter.emit('changePage', this._currentIndex);
    this.eventEmitter.emit('buildNav', this._currentIndex);
    this.controlNav();
};

NavView.prototype.renderNav = function(renderOption) {
    var renderOption = renderOption || [{ num: 1, maxIndex: 1 }];
    this._MAX_INDEX = renderOption.maxIndex;
    $(this.root).html(navTemplate({ pages: renderOption.pages }));
    this.controlNav();
};

NavView.prototype.controlNav = function() {
    this._navSelected();
    this._disabledCheck('#prevBtn', this._DEFAULT_INDEX);
    this._disabledCheck('#postBtn', this._MAX_INDEX);
};

NavView.prototype._navSelected = function() {
    Array.from($('.page-nav')).forEach(function(target) {
        var $target = $(target);
        $target.parent().removeClass('active');
        if ($target.text() == this._currentIndex) {
            $target.parent().addClass('active');
        }
    }.bind(this));
};

NavView.prototype._disabledCheck = function(target, indexNum) {
    var navBtn = $(target).parent();
    (this._currentIndex === indexNum)
        ? navBtn.addClass('disabled')
        : navBtn.removeClass('disabled');
};

NavView.prototype._init = function() {
    $(this.root).on('click', function(e) {
        var target = e.target;
        if (target.matches('.page-nav')) {
            this.onClickIndex(e);
        } else if (target.matches('#prevBtn')) {
            this.onClickNavBtn(e, function() {
                this._currentIndex -= 1
            }.bind(this));
        } else if (target.matches('#postBtn')) {
            this.onClickNavBtn(e, function() {
                this._currentIndex += 1
            }.bind(this));
        }
    }.bind(this));
};

module.exports = NavView;
