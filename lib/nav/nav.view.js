import navTemplate from './nav.hbs';

class NavView {
    constructor(eventEmitter, root, { countOfIndex, countOfItem }) {
        this.root = document.querySelector(root);
        this._eventEmitter = eventEmitter;

        this.DEFAULT_INDEX = 1;
        this.curIdx = this.DEFAULT_INDEX;
        this.IDX_COUNT = countOfIndex;
        this.TODO_COUNT = countOfItem;

        this.NAV = '.page-nav';
        this.PREV_BTN = '#prevBtn';
        this.NEXT_BTN = '#nextBtn';
        this.PREV_PAGE_BTN = '#prevPageBtn';
        this.NEXT_PAGE_BTN = '#nextPageBtn';

        this.DISABLED = 'disabled';
        this.ACTIVE = 'active';

        this._init();
    }

    onMove(e, changeCurIdx) {
        e.preventDefault();
        if (e.target.parentNode.classList.contains(this.DISABLED)) {
            return;
        }
        this.curIdx = changeCurIdx();
        this._eventEmitter.emit('buildNav', {
            index: this.curIdx,
            max: this.TODO_COUNT
        });
        this.controlNav();
    }

    renderNav({ maxIndex, pages } = { num: 1, maxIndex: 1 }) {
        this._MAX = maxIndex;
        this.root.innerHTML = navTemplate({ pages });
        this.controlNav();
    }

    controlNav() {
        this.changeNavStatus();
        this.ableCheck(this.PREV_BTN, this.curIdx === this.DEFAULT_INDEX);
        this.ableCheck(this.NEXT_BTN, this.curIdx === this._MAX);
        this.ableCheck(this.PREV_PAGE_BTN, this.curIdx <= this.IDX_COUNT);
        const isAbleToNext = Math.floor((this.curIdx - 1) / this.IDX_COUNT + 1) * this.IDX_COUNT;
        this.ableCheck(this.NEXT_PAGE_BTN, (isAbleToNext > this._MAX));
    }

    changeNavStatus() {
        const pagesNav = document.querySelectorAll(this.NAV);
        Array.from(pagesNav).forEach((target) => {
            target.parentNode.classList.remove(this.ACTIVE);
            if (Math.floor(target.textContent) === this.curIdx) {
                target.parentNode.classList.add(this.ACTIVE);
            }
        });
    }

    ableCheck(target, condition) {
        const isAble = document.querySelector(target).parentNode.classList;
        condition ? isAble.add(this.DISABLED) : isAble.remove(this.DISABLED);
    }

    _init() {
        this.root.addEventListener('click', (e) => {
            const target = e.target;
            if (target.matches(this.NAV)) {
                this.onMove(e, () => Math.floor(e.target.textContent));
            } else if (target.matches(this.PREV_BTN)) {
                this.onMove(e, () => this.curIdx - this.DEFAULT_INDEX)
            } else if (target.matches(this.NEXT_BTN)) {
                this.onMove(e, () => this.curIdx + this.DEFAULT_INDEX)
            } else if (target.matches(this.PREV_PAGE_BTN)) {
                this.onMove(e, () => {
                    const toPrevPage = (this.curIdx - 1) % this.IDX_COUNT + this.IDX_COUNT;
                    return this.curIdx - toPrevPage;
                });
            } else if (target.matches(this.NEXT_PAGE_BTN)) {
                this.onMove(e, () => {
                    const toNextPage = this.IDX_COUNT - ((this.curIdx - 1) % this.IDX_COUNT);
                    return this.curIdx + toNextPage;
                });
            }
        });
    }
}

export default NavView;
