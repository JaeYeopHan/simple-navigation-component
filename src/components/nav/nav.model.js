import NavService from './nav.service';

class NavModel {
    constructor(api, { countOfItem, countOfIndex }) {
        this._navService = new NavService(api);

        this.TODO_COUNT = countOfItem;
        this.IDX_COUNT = countOfIndex;

        this.pages = [];
    }

    getPages(index) {
        const base = parseInt((index - 1) / this.IDX_COUNT);
        const startIndex = base * this.IDX_COUNT;
        const endIndex = (base + 1) * this.IDX_COUNT;
        const pages = [];
        for (let i = startIndex; i < endIndex; i++) {
            if (this.pages[i] !== undefined) {
                pages.push(this.pages[i]);
            }
        }
        return {
            pages,
            maxIndex: this.maxIndex
        };
    }

    setRenderOption({ pages, maxIndex }) {
        this.pages = pages;
        this.maxIndex = maxIndex;
    }

    init() {
        return this._navService.getCountOfTodos().then(({ cnt }) => {
            const renderOption = this.getIndexInfo.call(this, cnt);
            this.setRenderOption(renderOption);
        }).catch(err => console.error(err));
    }

    getIndexInfo(count) {
        const pages = [];
        let maxIndex = parseInt(count / this.TODO_COUNT);
        if ((count % this.TODO_COUNT) !== 0) {
            maxIndex += 1;
        }
        for (let i = 1; i <= maxIndex; i++) {
            pages.push({ num: i });
        }

        return {
            pages,
            maxIndex
        };
    }
}

export default NavModel;
