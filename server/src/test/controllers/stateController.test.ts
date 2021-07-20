import 'mocha';
import chai from'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);
const expect = chai.expect;

import Server from './../../server';
import { seedState } from '../../testSetup/seed';
import { clearDatabase } from '../../testSetup/dbConfig';

describe("StateController", () => {

	let server;

	before(function(done){

		const serverInstance = new Server();
		serverInstance.listen();
		server = serverInstance.http;

		done();

	})

	beforeEach( async () => {
		return await seedState();
	})

	afterEach( async ()=> {
		return await clearDatabase();
	})

	after( async () => {})

	describe('fetchOne', () => {

		it("should fetch one", (done) => {

			const query = { key: '10' };

			chai.request(server)
            .get('/api/state')
			.query( query )
            .end((err, res) => {
				expect(res).to.have.status(200);
                expect(res.body).to.be.a('object').with.property('key').be.equal('10');
                expect(res.body).to.be.a('object').with.property('value').be.equal('11');

              	done();
            });

		})

		it("should fetch none", (done) => {

			const query = { key: '50' };

			chai.request(server)
            .get('/api/state')
			.query( query )
            .end((err, res) => {
				expect(res).to.have.status(404);
              	done();
            });

		})

		it("should return error. The key must not be empty", (done) => {

			const query = { key: '' };

			chai.request(server)
            .get('/api/state')
			.query( query )
            .end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.message).be.equal('The key must not be empty');
              	done();
            });

		})

	})

})