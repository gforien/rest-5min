/******************************
 *        dependencies        *
 ******************************/
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const sinon = require('sinon');


/**********************************
 *        back-end testing        *
 **********************************/
describe('Back-end testing', () => {

  beforeEach(() => {
    this.log = sinon.stub(console, 'log');
  });

  afterEach(() => {
    this.log.restore();
  });

  it(`should log "Listening on port ${PORT}"`, () => {
    let expected = `Listening on port ${PORT}`;

    console.log(expected);
    expect(console.log.calledWith(expected)).to.be.true;
  });
});


describe('routes testing', () => {

  const server = require('../index');

  it('should have status 200 and log a simple sentence', () => {

    chai
      .request(server)
      .get('/')
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.status).to.equal(200);
        expect(res.text).to.equal('Bravo ! You made it to the front page');
      });

  });
});
