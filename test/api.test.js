import chai from 'chai';
import chaiHttp from 'chai-http';
const expect = chai.expect;
chai.use(chaiHttp);

import config from '../config';

describe('API test', () => {
    const api = config.api;
    it('fetch todo\'s count data', done => {
        chai
            .request(api)
            .get('/count')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });

    it('fetch todo data', done => {
        const index = 0;
        const count = 3;
        chai
            .request(api)
            .get('/page?start=' + index + '&limit=' + count)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });
});
