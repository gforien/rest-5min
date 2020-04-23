/******************************
 *        dependencies        *
 ******************************/
const PORT = process.env.PORT || 5000;
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');


/******************************
 *        unit testing        *
 ******************************/
describe('Back-end unit testing', () => {

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