import "mocha";
import chai from'chai';
const expect = chai.expect;

import StateService from '../../services/stateService';
import { seedState } from '../../testSetup/seed';
import { clearDatabase, connectDatabase } from '../../testSetup/dbConfig';

describe("StateService", () => {

    let stateService;

	before( async ()=> {

        try {
            
            stateService = new StateService();
            await connectDatabase();

        } catch (error) {
            console.error('\x1b[31m', "[MySQL] Can't Connect", error);
        }
	})

	beforeEach( async ()=> {
        return await seedState();
    })

	after( async ()=> {	})

	afterEach( async ()=> {
		return await clearDatabase();
	})

    describe('updateState', () => {

        it("should udpate one", async () => {
            const [qUpdatedStates] = await stateService.updateState({key:'10', value:'123'}, null);
			expect(qUpdatedStates).be.equal(1);
        })

        it("should udpate none", async () => {
            const [qUpdatedStates] = await stateService.updateState({key:'50', value:'123'}, null);
			expect(qUpdatedStates).be.equal(0);
        })

    })

    describe('fetchState', async () => {

        it("should return a state", async () => {
            const fetchedState = await stateService.fetchAndLockState('10');
            expect(fetchedState).to.be.a('object').with.property('key').be.equal('10');
            expect(fetchedState).to.be.a('object').with.property('value').be.equal('11');
        })

        it("should return no state", async () => {
            const fetchedState = await stateService.fetchAndLockState('50');
			expect(fetchedState).be.null;
        })

    })

    describe('createState', async () => {

        it("should return new state created", async () => {

            const newState = {
                key:'shu', 
                value:'lian'
            };

            const [createdState, created] = await stateService.createState(newState, null);

            expect(createdState).to.be.a('object').with.property('id').not.be.undefined;
            expect(createdState).to.be.a('object').with.property('key').be.equal('shu');
            expect(createdState).to.be.a('object').with.property('value').be.equal('lian');
            expect(created).to.be.true;

        })

        it("should return that was not created but updated", async () => {

            const newState = {
                key: '10',
                value: '12345234'
            };

            const [_,created] = await stateService.createState(newState);

            expect(created).to.be.false;

        })
    })
	

})