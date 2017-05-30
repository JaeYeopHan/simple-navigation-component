var EventEmitter = require('wolfy87-eventemitter');
var $ = require('jquery');

var listTemplate = require('./list.hbs');
var navTemplate = require('./nav.hbs');

function TodoView(listRoot, navRoot) {
    this.listRoot = listRoot;
    this.navRoot = navRoot;
    var eventEmitter = new EventEmitter();
    this.init();
};

TodoView.prototype.init = function () {
    $(this.navRoot).html(navTemplate({
        prevDisable: false,
        postDisable: false
    }));
};

TodoView.prototype.render = function () {
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

module.exports = TodoView;
