var $ = require('jquery');
var navTemplate = require('./nav.hbs');

function NavView(eventEmitter, root) {
    this.root = root;
    this.eventEmitter = eventEmitter;
    this._currentIndex = 1;
    this._init();
}

NavView.prototype.onClickIndex = function(e) {
    e.preventDefault();
    var index = parseInt($(e.target).text());
    this._currentIndex = index;
    var renderOption = {
        index: index,
        max: this._MAX_INDEX
    };
    //TODO Remove dependency
    this.eventEmitter.emit('changePage', index);
    this.eventEmitter.emit('buildNav', renderOption);
    this.controlNav();
};

NavView.prototype.onClickNavBtn = function(e, controlCurrentIndex) {
    e.preventDefault();
    if ($(e.target).closest('li').hasClass('disabled')) {
        return;
    }
    controlCurrentIndex();

    var renderOption = {
        index: this._currentIndex,
        max: this._MAX_INDEX
    };
    this.eventEmitter.emit('changePage', this._currentIndex);
    this.eventEmitter.emit('buildNav', renderOption);
    this.controlNav();
};

NavView.prototype.renderNav = function(renderOption) {
    var renderOption = renderOption || [{ num: 1, maxIndex: 1 }];
    this._MAX_INDEX = renderOption.maxIndex;
    $(this.root).html(navTemplate({ pages: renderOption.pages }));
    this.controlNav();
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

NavView.prototype.disabledCheck = function(target, indexNum) {
    var post = $(target).parent();
    (this._currentIndex === indexNum)
        ? post.addClass('disabled')
        : post.removeClass('disabled');
};

NavView.prototype.controlNav = function() {
    this.navSelected();
    this.disabledCheck('#prevBtn', 1);
    this.disabledCheck('#postBtn', this._MAX_INDEX);
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
