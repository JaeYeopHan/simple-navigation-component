var TodoView = require('./todo.view.js');
var TodoService = require('./todo.service');
var EventEmitter = require('event-emitter');

function TodoController(api, listRoot, navRoot) {
    this.eventEmitter = new EventEmitter();
    this._todoView = new TodoView(this.eventEmitter, listRoot, navRoot);
    this._todoService = new TodoService(api);

    this._ONEPAGE_TODOCOUNT = 3;
    this._MAX_PAGE_NUM = 5;
    this._DEFAULT_PAGE_NUM = 1;

    this._initView();
    this._attachEvent();
};

TodoController.prototype.updateViewOfPage = function(num) {
    var startNum = (num - 1) * this._ONEPAGE_TODOCOUNT;
    this._todoService.getTodosOfPage(startNum).then(function(todos) {
        this._todoView.renderList(todos);
    }.bind(this)).catch(function(err) {
        console.log(err);
    });
};

TodoController.prototype.buildNav = function() {
    this._todoService.getCountOfTodos().then(function(countObj) {
        var renderOption = this._getRenderOption.call(this, countObj.cnt);
        this._todoView.renderNav({
            page: renderOption.result,
            prevDisable: renderOption.prevDisable,
            postDisable: renderOption.postDisable
        });
    }.bind(this)).catch(function(err) {
        console.error(err);
    });
};

TodoController.prototype._getRenderOption = function(count) {
    var result = [];
    var pageNum = count / this._ONEPAGE_TODOCOUNT;
    var prevDisable = false;
    var postDisable = false;
    if (pageNum > this._MAX_PAGE_NUM) {
        for (var i = 1; i <= this._MAX_PAGE_NUM; i++) {
            result.push({ num: i });
            postDisable = true;
        }
    } else {
        for (var i = 1; i <= pageNum + 1; i++) {
            result.push({ num: i });
        }
    }

    return {
        result: result,
        prevDisable: prevDisable,
        postDisable: postDisable
    };
};

TodoController.prototype._attachEvent = function() {
    this.eventEmitter.on('changePage', this.updateViewOfPage.bind(this));
};

TodoController.prototype._initView = function() {
    this.updateViewOfPage(this._DEFAULT_PAGE_NUM);
    this.buildNav();
};

module.exports = TodoController;
