import NavView from './nav.view';
import NavModel from './nav.model';
import EventEmitter from 'event-emitter';

class NavController {
    constructor(api, root, navOption) {
        this.navOption = navOption || {
                countOfItem: 3,
                countOfIndex: 5
            };

        this._eventEmitter = new EventEmitter();
        this._navModel = new NavModel(api, this.navOption);
        this._navView = new NavView(this._eventEmitter, root, this.navOption);

        this.DEFAULT_INDEX = 1;

        this._init();
    }

    render(renderOption) {
        //TODO Change to Default paramter
        var renderOption = renderOption || {
                index: this.DEFAULT_INDEX,
                max: this.navOption.countOfItem
            };
        this._navView.renderNav(this._navModel.getPages(renderOption.index));
    }

    _init() {
        this._navModel.init().then(function() {
            this.render();
            this._attachEvent();
        }.bind(this)).catch(function(err) {
            console.error(err);
        });
    }

    _attachEvent() {
        this._eventEmitter.on('buildNav', function(data) {
            this.render(data);
        }.bind(this));
    }

    on(event, callback) {
        this._eventEmitter.on(event, callback);
    }
}

export default NavController;
