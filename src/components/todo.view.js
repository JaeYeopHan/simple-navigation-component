var $ = require('jquery');

var listTemplate = require('./list.hbs');
var navTemplate = require('./nav.hbs');

function TodoView(eventEmitter, listRoot, navRoot) {
    this.listRoot = listRoot;
    this.navRoot = navRoot;
    this.eventEmitter = eventEmitter;
    this.init();
};

TodoView.prototype.onClickPageNav = function(e) {
    e.preventDefault();
    this.eventEmitter.emit('changePage', $(e.target).text());
};

TodoView.prototype.renderNav = function() {
    $(this.navRoot).html(navTemplate({
        page: [{
            num: 1
        }, {
            num: 2
        }, {
            num: 3
        }, {
            num: 4
        }, {
            num: 5
        }],
        prevDisable: false,
        postDisable: false
    }));
};

TodoView.prototype.renderList = function () {
    $(this.listRoot).html(listTemplate({
        todo: [{
            id: 1,
            todo: 'test1'
        }, {
            id: 2,
            todo: 'test2'
        }, {
            id: 3,
            todo: 'test3'
        }]
    }));
};

TodoView.prototype.init = function () {
    $(this.navRoot).on('click', function(e) {
        var target = e.target;
        if (target.matches('.page-nav')) {
            this.onClickPageNav(e);
        }
    }.bind(this));
};

module.exports = TodoView;
