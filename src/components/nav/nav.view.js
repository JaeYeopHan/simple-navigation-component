var $ = require('jquery');
var navTemplate = require('./nav.hbs');

function NavView(eventEmitter, root) {
    this.root = root;
    this.eventEmitter = eventEmitter;

    this._init();
};

NavView.prototype.onClickPageNav = function(e) {
    e.preventDefault();
    var renderOption = {
        index: $(e.target).text(),
        max: 3
    };
    this.eventEmitter.emit('changePage', renderOption);
    $(e.target).addClass('selected');
};

NavView.prototype.onClickPrevBtn = function(e) {
    console.log('prev button clicked');
};

NavView.prototype.onClickPostBtn = function(e) {
    console.log('post button clicked');
};

NavView.prototype.renderNav = function(pages) {
    var pages = pages || [{ num: 1 }];
    $(this.root).html(navTemplate({ page: pages }));
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
