import chai from 'chai';
const expect = chai.expect;

import NavService from '../src/components/nav/nav.service';
import config from '../config';

describe('NavService.js test', () => {
    const api = config.api;

    const navService = new NavService(api);
    const count = 21;

    it('getCountOfTodos', done => {
        navService.getCountOfTodos()
            .then(({ status, data }) => {
                if (expect(status).equal(200) && expect(data.cnt).equal(count)) {
                    done();
                }
            })
            .catch(err => console.error(err));
    });
});
