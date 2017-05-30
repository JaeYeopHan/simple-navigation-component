var $ = require('jquery');

var listTemplate = require('./list.hbs');
var navTemplate = require('./nav.hbs');

function TodoView(eventEmitter, listRoot, navRoot) {
    this.listRoot = listRoot;
    this.navRoot = navRoot;
    this.eventEmitter = eventEmitter;
    this._init();
};

TodoView.prototype.onClickPageNav = function(e) {
    e.preventDefault();
    this.eventEmitter.emit('changePage', $(e.target).text());
};

TodoView.prototype.renderNav = function(opt) {
    var opt = opt || {
            page: [{
                num: 1
            }],
            prevDisable: false,
            postDisable: false
    };
    $(this.navRoot).html(navTemplate({
        page: opt.page,
        prevDisable: opt.prevDisable,
        postDisable: opt.postDisable
    }));
};

TodoView.prototype.renderList = function(todos) {
    var todos = todos || {id: 1, todo: 'todos가 없습니다.'};
    $(this.listRoot).html(listTemplate({ todos: todos }));
};

TodoView.prototype._init = function () {
    $(this.navRoot).on('click', function(e) {
        var target = e.target;
        if (target.matches('.page-nav')) {
            this.onClickPageNav(e);
        }
    }.bind(this));
};

module.exports = TodoView;
