import listTemplate from './list.hbs';

class ListView {
    constructor(eventEmitter, root) {
        this.root = document.querySelector(root);
        this._eventEmitter = eventEmitter;
    }

    renderList(todos = { id: 1, todo: 'todos가 없습니다.' }) {
        this.root.innerHTML = listTemplate({ todos: todos });
    }
}

export default ListView;
