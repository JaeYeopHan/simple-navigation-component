var $ = require('jquery');
var navTemplate = require('./nav.hbs');

function NavView(eventEmitter, root) {
    this.root = root;
    this.eventEmitter = eventEmitter;
    this._init();
};

NavView.prototype.onClickPageNav = function(e) {
    e.preventDefault();
    this.eventEmitter.emit('changePage', $(e.target).text());
};

NavView.prototype.renderNav = function(opt) {
    var opt = opt || {
            page: [{
                num: 1
            }],
            prevDisable: false,
            postDisable: false
        };
    $(this.root).html(navTemplate({
        page: opt.page,
        prevDisable: opt.prev,
        postDisable: opt.post
    }));
};

NavView.prototype._init = function() {
    $(this.root).on('click', function(e) {
        var target = e.target;
        if (target.matches('.page-nav')) {
            this.onClickPageNav(e);
        }
    }.bind(this));
};

module.exports = NavView;
