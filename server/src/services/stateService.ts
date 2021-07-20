import { Transaction as TransactionType }  from 'sequelize/types';
import { Transaction }                     from 'sequelize';
import db                                  from '../database/models/index';
import { State }                           from '../interfaces/state';
import { StateError }                      from '../interfaces/stateError';
import validate                            from '../utils/validate';
class StateService {

    /**
     * 
     * @param state 
     * @returns 'updated' | 'created'
     */
    async transactionalUpsert(state: State): Promise<string>{
        const errors: StateError[] = validate.stateValidate(state);
        if (errors.length > 0) throw errors;
    
        const transactionOpts = {
            autocommit: false,
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED
        };
    
        const t: TransactionType = await db.sequelize.transaction(transactionOpts);
    
        try{
            const operation: string = await persistenceStateFlow(this, state, t);
            t.commit();
            return operation;
        } catch (error) {
            t.rollback();
            throw error;
        }
    }

    /**
     * 
     * @param state
     * @param t 
     * @returns 
     */
    async updateState({key, value}: State, t?: TransactionType): Promise<[number, State[]]>{

        try {

            return await db.State.update({
                value
            },{
                where: { key },
                transaction: t
            });

        } catch (error) {
            throw error;
        }

    }

    /**
     *
     * @param state
     * @param t
     * @returns
     */
    async createState(state: State, t?: TransactionType): Promise<[State, boolean | null]>{
        try {
            // console.log('\x1b[35m', `[DB] 0 document(s) exists with key "${state.key}". Let's create it `);
            return await db.State.upsert(state, {transaction: t, returning: false});
        } catch (error) {
            // console.log(error);
            throw error;
        }
    }

    /**
     * 
     * @param key 
     * @param t 
     * @returns 
     */
    async fetchAndLockState(key: string | null, t?: TransactionType | null): Promise<State | null>{
        try {

            return await db.State.findOne(
            {
                where: { key },
                attributes: ['key', 'value'],
                transaction: t,
                lock: t ? t.LOCK.UPDATE : false
            });
        } catch (error) {
            throw error;
        }
    }

}

const persistenceStateFlow = async ( stateService: StateService, state: State, t: TransactionType ): Promise<string> => {

    const stateExists = await stateService.fetchAndLockState(state.key, t);

    if ( !stateExists ) {
        const [_, created] = await stateService.createState( state, t );
        return created ? 'created' : 'updated';
    }

    await stateService.updateState( state, t );
    return 'updated';

}

export default StateService;