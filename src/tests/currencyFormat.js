//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;
const chaihttp = require('chai-http');
const { app } = require('../../index');
const should = chai.should();
const sinon = require('sinon');

chai.use(chaihttp);

//Importing our model for our unit testing.
var CurrencyFormat = require('../models/currencyFormats');

describe('currencyFormat_controller', function() {
	beforeEach((done) => {
		//Before each test we empty the database
		CurrencyFormat.deleteMany({}, (err) => {
			done();
		});
	});

	describe('getAllCurrencyFormats', function() {
		it('should get array of currency formats', function(done) {
			chai.request(app).get('/currencyFormats').end((err, res) => {
				expect(res).to.have.status(200);
				expect(res).to.be.json;
				expect(res.body).to.be.an('object');

				expect(res.body).to.have.property('type');
				expect(res.body).to.have.property('message');
				expect(res.body).to.have.property('data');
				expect(res.body.data).to.have.property('currencyFormats');

				expect(res.body.data.currencyFormats).to.be.an('array');
				expect(res.body.data.currencyFormats.length).to.equal(0);

				done();
			});
		});

		it('should get array of currency formats with at least one element', async function() {
			let newCurrencyFormat = new CurrencyFormat({
				currencyAfterPrice: false,
				showCents: true,
				thousandDelimeter: 'comma',
				currencyDisplay: 'symbol',
				marketCountry: 'United States',
				currency: 'USD'
			});
			await newCurrencyFormat.save();

			let res = await chai.request(app).get('/currencyFormats');

			expect(res).to.have.status(200);
			expect(res).to.be.json;
			expect(res.body).to.be.an('object');

			expect(res.body).to.have.property('type');
			expect(res.body).to.have.property('message');
			expect(res.body).to.have.property('data');
			expect(res.body.data).to.have.property('currencyFormats');

			expect(res.body.data.currencyFormats).to.be.an('array');
			expect(res.body.data.currencyFormats.length).to.equal(1);
		});
	});
});
