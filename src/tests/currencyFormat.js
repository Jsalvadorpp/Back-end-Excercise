//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;
const chaihttp = require('chai-http');
const { app } = require('../../index');
const sinon = require('sinon');
chai.use(chaihttp);

//Importing our model for our unit testing.
var CurrencyFormat = require('../models/currencyFormats');

describe('currencyFormat_controller', function() {
	sinon.stub(console, 'log'); // disable console.log on tests

	beforeEach((done) => {
		//Before each test we empty the database
		CurrencyFormat.deleteMany({}, (err) => {
			done();
		});
	});

	afterEach((done) => {
		//After each test we empty the database
		CurrencyFormat.deleteMany({}, (err) => {
			done();
		});
	});

	// endpoint to get all currency formats
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

	// endpoint to get currency formats by country
	describe('getFormatByCountry', function() {
		it('should get array of currency formats for the Spain Country', async function() {
			let newCurrencyFormat = new CurrencyFormat({
				currencyAfterPrice: false,
				showCents: true,
				thousandDelimeter: 'comma',
				currencyDisplay: 'symbol',
				marketCountry: 'Spain',
				currency: 'EUR'
			});
			await newCurrencyFormat.save();

			let res = await chai.request(app).get('/currencyFormat?country=Spain');

			expect(res).to.have.status(200);
			expect(res).to.be.json;
			expect(res.body).to.be.an('object');

			expect(res.body).to.have.property('type').eql('Success');
			expect(res.body).to.have.property('message').eql('data obtained');
			expect(res.body).to.have.property('data');
			expect(res.body.data).to.have.property('currencyFormats');

			expect(res.body.data.currencyFormats).to.be.an('array');
			expect(res.body.data.currencyFormats.length).to.equal(1);
		});
	});

	// endpoint to create a new currency format
	describe('createFormat', function() {
		it('should create a new currency format', async function() {
			let newCurrencyFormat = {
				currencyAfterPrice: false,
				showCents: true,
				thousandDelimeter: 'comma',
				currencyDisplay: 'symbol',
				marketCountry: 'Spain',
				currency: 'EUR'
			};

			let res = await chai.request(app).post('/currencyFormat').send(newCurrencyFormat);

			expect(res).to.have.status(200);
			expect(res).to.be.json;
			expect(res.body).to.be.an('object');

			expect(res.body).to.have.property('type').eql('Success');
			expect(res.body).to.have.property('message').eql('entry created successfully in database');
			expect(res.body).to.have.property('data');
			expect(res.body.data).to.have.property('currencyFormat');

			expect(res.body.data.currencyFormat).to.be.an('object');
		});

		it('should return error if the market country is not available country (i.e Narnia)', async function() {
			let newCurrencyFormat = {
				currencyAfterPrice: false,
				showCents: true,
				thousandDelimeter: 'comma',
				currencyDisplay: 'symbol',
				marketCountry: 'Narnia',
				currency: 'EUR'
			};

			let res = await chai.request(app).post('/currencyFormat').send(newCurrencyFormat);

			expect(res).to.have.status(200);
			expect(res).to.be.json;
			expect(res.body).to.be.an('object');
			expect(res.body).to.have.property('type').eql('Error');
		});

		it('should return error if try to create an entry with a country and currency that already exist in database', async function() {
			let AlreadyExists = new CurrencyFormat({
				currencyAfterPrice: false,
				showCents: true,
				thousandDelimeter: 'comma',
				currencyDisplay: 'symbol',
				marketCountry: 'Spain',
				currency: 'EUR'
			});
			await AlreadyExists.save();

			let newCurrencyFormat = {
				currencyAfterPrice: false,
				showCents: true,
				thousandDelimeter: 'comma',
				currencyDisplay: 'symbol',
				marketCountry: 'Spain',
				currency: 'EUR'
			};

			let res = await chai.request(app).post('/currencyFormat').send(newCurrencyFormat);

			expect(res).to.have.status(200);
			expect(res).to.be.json;
			expect(res.body).to.be.an('object');
			expect(res.body).to.have.property('type').eql('Error');
		});
	});

	// endpoint to update an existing currency format
	describe('updateFormat', function() {
		it('should return an updated field of the selected country and currency ', async function() {
			let AlreadyExists = new CurrencyFormat({
				currencyAfterPrice: false,
				showCents: true,
				thousandDelimeter: 'comma',
				currencyDisplay: 'symbol',
				marketCountry: 'Spain',
				currency: 'EUR'
			});
			await AlreadyExists.save();

			let updatedCurrencyFormat = {
				currencyAfterPrice: false,
				showCents: true,
				thousandDelimeter: 'comma',
				currencyDisplay: 'code',
				marketCountry: 'Spain',
				currency: 'EUR'
			};

			let res = await chai.request(app).put('/currencyFormat').send(updatedCurrencyFormat);

			expect(res).to.have.status(200);
			expect(res).to.be.json;
			expect(res.body).to.be.an('object');
			expect(res.body).to.have.property('type').eql('Success');
			expect(res.body.data.currencyFormat.currencyDisplay).eql(updatedCurrencyFormat.currencyDisplay);
		});

		it('should return error if trying to update a format with the selected country and currency that does not exist ', async function() {
			let updatedCurrencyFormat = {
				currencyAfterPrice: false,
				showCents: true,
				thousandDelimeter: 'comma',
				currencyDisplay: 'symbol',
				marketCountry: 'Spain',
				currency: 'EUR'
			};

			let res = await chai.request(app).put('/currencyFormat').send(updatedCurrencyFormat);

			expect(res).to.have.status(200);
			expect(res).to.be.json;
			expect(res.body).to.be.an('object');
			expect(res.body).to.have.property('type').eql('Error');
		});
	});

	// endpoint to delete an existing currency format
	describe('removeFormat', function() {
		it('should return error if trying to delete a format with the selected country and currency that does not exist ', async function() {
			let formatToDelete = {
				marketCountry: 'Spain',
				currency: 'EUR'
			};

			let res = await chai.request(app).delete('/currencyFormat').send(formatToDelete);

			expect(res).to.have.status(200);
			expect(res).to.be.json;
			expect(res.body).to.be.an('object');
			expect(res.body).to.have.property('type').eql('Error');
		});

		it('should remove an existing currency format from the system', async function() {
			let AlreadyExists = new CurrencyFormat({
				currencyAfterPrice: false,
				showCents: true,
				thousandDelimeter: 'comma',
				currencyDisplay: 'symbol',
				marketCountry: 'Spain',
				currency: 'EUR'
			});
			await AlreadyExists.save();

			let formatToDelete = {
				country: 'Spain',
				currency: 'EUR'
			};

			let res = await chai.request(app).delete('/currencyFormat').send(formatToDelete);

			expect(res).to.have.status(200);
			expect(res).to.be.json;
			expect(res.body).to.be.an('object');
			expect(res.body).to.have.property('type').eql('Success');
		});
	});
});
