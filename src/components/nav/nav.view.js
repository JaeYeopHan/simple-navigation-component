import $ from 'jquery';
import navTemplate from './nav.hbs';

class NavView {
    constructor(eventEmitter, root, navOption) {
        this.root = root;
        this._eventEmitter = eventEmitter;

        this.DEFAULT_INDEX = 1;
        this.curIdx = this.DEFAULT_INDEX;
        this.IDX_COUNT = navOption.countOfIndex;
        this.TODO_COUNT = navOption.countOfItem;

        this._init();
    }

    onClickIndex(e) {
        e.preventDefault();
        this.curIdx = parseInt($(e.target).text());
        this._eventEmitter.emit('buildNav', {
            index: this.curIdx,
            max: this.TODO_COUNT
        });
        this.controlNav();
    }

    onClickNavBtn(e, changeCurIdx) {
        e.preventDefault();
        if ($(e.target).closest('li').hasClass('disabled')) {
            return;
        }
        this.curIdx = changeCurIdx();
        this._eventEmitter.emit('buildNav', {
            index: this.curIdx,
            max: this.TODO_COUNT
        });
        this.controlNav();
    }

    renderNav(renderOption) {
        //TODO change to Default parameter
        var renderOption = renderOption || [{ num: 1, maxIndex: 1 }];
        this._MAX = renderOption.maxIndex;
        $(this.root).html(navTemplate({ pages: renderOption.pages }));
        this.controlNav();
    }

    controlNav() {
        this.navSelected();
        this.ableCheck('#prevBtn', this.curIdx === this.DEFAULT_INDEX);
        this.ableCheck('#nextBtn', this.curIdx === this._MAX);
        this.ableCheck('#prevPageBtn', this.curIdx <= this.IDX_COUNT);
        const isAbleToNext = parseInt((this.curIdx - 1) / this.IDX_COUNT + 1) * this.IDX_COUNT;
        this.ableCheck('#nextPageBtn', (isAbleToNext > this._MAX));
    }

    navSelected() {
        Array.from($('.page-nav')).forEach(function(target) {
            const $target = $(target);
            $target.parent().removeClass('active');
            if (parseInt($target.text()) === this.curIdx) {
                $target.parent().addClass('active');
            }
        }.bind(this));
    }

    ableCheck(target, condition) {
        const navBtn = $(target).parent();
        (condition) ? navBtn.addClass('disabled') : navBtn.removeClass('disabled');
    }

    _init() {
        $(this.root).on('click', function(e) {
            const target = e.target;
            if (target.matches('.page-nav')) {
                this.onClickIndex(e);
            } else if (target.matches('#prevBtn')) {
                this.onClickNavBtn(e, function() {
                    return this.curIdx - this.DEFAULT_INDEX;
                }.bind(this));
            } else if (target.matches('#nextBtn')) {
                this.onClickNavBtn(e, function() {
                    return this.curIdx + this.DEFAULT_INDEX;
                }.bind(this));
            } else if (target.matches('#prevPageBtn')) {
                this.onClickNavBtn(e, function() {
                    const toPrevPage = (this.curIdx - 1) % this.IDX_COUNT + this.IDX_COUNT;
                    return this.curIdx - toPrevPage;
                }.bind(this));
            } else if (target.matches('#nextPageBtn')) {
                this.onClickNavBtn(e, function() {
                    const toNextPage = this.IDX_COUNT - ((this.curIdx - 1) % this.IDX_COUNT);
                    return this.curIdx + toNextPage;
                }.bind(this));
            }
        }.bind(this));
    }
}

export default NavView;
