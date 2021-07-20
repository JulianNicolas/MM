import 'mocha';
import chai from'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);
const expect = chai.expect;

const io = require('socket.io-client');

import Server from './../../server';
import { clearDatabase } from '../../testSetup/dbConfig';
import { seedState } from '../../testSetup/seed';

describe('Websockets', function() {

    let server, singleSocket, sockets = [];

    before(function(done) {

		const serverInstance = new Server();
		serverInstance.listen();
		server = serverInstance.http;

        for ( let i = 0; i < 85; i++){
            const socket = io.connect('http://localhost:3000');
            sockets.push(socket);
        }
        
        done();
    });

	beforeEach( async () => {
        singleSocket = io.connect('http://localhost:3000');
		return await seedState();
	})

	afterEach( async ()=> {
        if(singleSocket.connected) singleSocket.disconnect();
		return await clearDatabase();
	})    

    after(function(done) {

        for ( let socket of sockets ){
            if(socket.connected) socket.disconnect();
        }
        done();
    });

    describe('message', function() {

        it('should return created', function(done){

            const state = { key: '60', value: '66' };

            singleSocket.on("messageResponse", (res) => {
                expect(res).to.be.a('object').with.property('operation').to.equal('created');
                done();
            });

            singleSocket.emit('message', state);

        })

        it('should return updated', function(done){

            const state = { key: '10', value: '12' };

            singleSocket.on("messageResponse", (res) => {
                expect(res).to.be.a('object').with.property('operation').to.equal('updated');
                done();
            });

            singleSocket.emit('message', state);

        })

        it('should return error', function(done){

            const state = { key: '111111111122222222223333333333444444444455555555556', value: 'newValue' };

            singleSocket.on("messageResponse", (res) => {
                expect(res).to.be.a('object').with.property('hasError').to.be.a('object');
                done();
            });

            singleSocket.emit('message', state);

        })

        it('should deal with concurrency. No errors returned', function(done) {

            let i = 0;
            let responses = [];
            
            for ( let socket of sockets ){
                
                const state = { key: 'hey', value: i.toString() };

                socket.on("messageResponse", (res) => {

                    responses.push(res.hasError);

                    if ( responses.length === sockets.length ){
                        expect(responses).to.be.an('array').that.does.not.include(true);
                        done()
                    }
                });
                
                socket.emit('message', state);
                
                i++;
                
            }

        });

    });

});