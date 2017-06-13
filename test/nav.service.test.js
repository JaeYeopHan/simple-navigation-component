import chai from 'chai';
const expect = chai.expect;

import NavService from '../src/components/nav/nav.service';

describe('NavService.js test', () => {
    const api = 'http://128.199.76.9:8002/jbee/todo';
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
