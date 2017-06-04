var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
chai.use(chaiHttp);

describe('API test', function() {
    var api = 'http://128.199.76.9:8002/jbee/todo';
    it('fetch todo\'s count data', function(done) {
        chai
            .request(api)
            .get('/count')
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });

    it('fetch todo data', function(done) {
        var index = 0;
        var count = 3;
        chai
            .request(api)
            .get('/page?start=' + index + '&limit=' + count)
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });
});
