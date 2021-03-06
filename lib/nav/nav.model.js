import NavService from './nav.service';

class NavModel {
    constructor(api, { countOfItem, countOfIndex }) {
        this._navService = new NavService(api);

        this.TODO_COUNT = countOfItem;
        this.IDX_COUNT = countOfIndex;

        this.pages = [];
    }

    getPages(index) {
        const base = Math.floor((index - 1) / this.IDX_COUNT);
        const startIndex = base * this.IDX_COUNT;
        const endIndex = (base + 1) * this.IDX_COUNT;
        const pages = [];
        for (let i = startIndex; i < endIndex; i++) {
            if (this.pages[i]) {
                pages.push(this.pages[i]);
            }
        }
        return {
            pages,
            maxIndex: this.maxIndex,
        };
    }

    init() {
        return this._navService.getCountOfTodos().then(({ data }) => {
            const { pages, maxIndex } = this.getIndexInfo(data.cnt);
            this.pages = pages;
            this.maxIndex = maxIndex;
        }).catch(err => console.error(err));
    }

    getIndexInfo(count) {
        const pages = [];
        let maxIndex = Math.floor(count / this.TODO_COUNT);
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
