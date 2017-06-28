import { expect } from 'chai';

import handlebars from 'handlebars';
import config from '../../config';
import Nav from '../../src/components/nav';

describe('Navigation Component test', () => {
    const root = '#nav';

    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            new Nav(config.api, root);
            resolve();
        });
    });

    it('rendering', (done) => {
        promise.then(() => {
            expect(document.querySelector(root).childElementCount).to.equal(1);
            done();
        }).catch(err => console.error(err));
    });
});

