import NavView from './nav.view';
import NavModel from './nav.model';
import EventEmitter from 'event-emitter';

class NavController {
    constructor(api, root, navOption = { countOfItem: 3, countOfIndex: 5 }) {
        this.navOption = navOption;

        this._eventEmitter = new EventEmitter();
        this._navModel = new NavModel(api, this.navOption);
        this._navView = new NavView(this._eventEmitter, root, this.navOption);

        this.DEFAULT_INDEX = 1;

        this._init();
    }

    render({ index } = { index: this.DEFAULT_INDEX }) {
        this._navView.renderNav(this._navModel.getPages(index));
    }

    _init() {
        this._navModel.init().then(() => {
            this.render();
            this._attachEvent();
        }).catch(err => console.error(err));
    }

    _attachEvent() {
        this._eventEmitter.on('buildNav', data => this.render(data));
    }

    on(event, callback) {
        this._eventEmitter.on(event, callback);
    }
}

export default NavController;
