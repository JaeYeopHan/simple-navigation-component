var $ = require('jquery');
var navTemplate = require('./nav.hbs');

function NavView(eventEmitter, root, navOption) {
    this.root = root;
    this.eventEmitter = eventEmitter;
    this._currentIndex = 1;
    this._MAX_TODO_COUNT_OF_PAGE = navOption.countOfItem;
    this._init();
}

NavView.prototype.onClickPageNav = function(e) {
    e.preventDefault();
    var index = $(e.target).text();
    this._currentIndex = parseInt(index);
    var renderOption = {
        index: index,
        max: this._MAX_TODO_COUNT_OF_PAGE
    };
    this.eventEmitter.emit('changePage', renderOption);
    this.navSelected();
    this.prevCheck();
};

NavView.prototype.onClickPrevBtn = function(e) {
    e.preventDefault();
    if ($(e.target).closest('li').hasClass('disabled')) {
        return;
    }
    this._currentIndex -= 1;
    var renderOption = {
        index: this._currentIndex,
        max: this._MAX_TODO_COUNT_OF_PAGE
    };
    this.eventEmitter.emit('changePage', renderOption);
    this.navSelected();
    this.prevCheck();
};

NavView.prototype.onClickPostBtn = function(e) {
    e.preventDefault();
    this._currentIndex += 1;
    if (this._currentIndex > 5) {
        if ($(e.target).closest('li').hasClass('disabled')) {
            return;
        }
        // TODO
        // controller에서 새로운 이벤트 등록
        // renderNav 다시. _currentIndex + 1 부터 되는대로.
    }
    var renderOption = {
        index: this._currentIndex,
        max: this._MAX_TODO_COUNT_OF_PAGE
    };
    this.eventEmitter.emit('changePage', renderOption);
    this.navSelected();
    this.prevCheck();
};

NavView.prototype.renderNav = function(renderOption) {
    var renderOption = renderOption || [{ num: 1, post: false }];
    this.post = renderOption.post;
    $(this.root).html(navTemplate({
        pages: renderOption.pages
    }));
    this.navSelected();
    this.prevCheck();
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

NavView.prototype.prevCheck = function() {
    var prev = $('#prevBtn').parent();
    this._currentIndex == 1
        ? prev.addClass('disabled')
        : prev.removeClass('disabled');
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
