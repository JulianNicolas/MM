import { Request, Response } from 'express';
import StateService          from './../services/stateService';

const stateService = new StateService();
class StateController {

    static async fetchOne( req: Request, res: Response ){

        try {

            let key = (req.query as any).key;

            const fetchedState = await stateService.fetchAndLockState(key);

            if ( fetchedState ) res.status(200).json(fetchedState);
            else                res.status(404).json({err:'Key does not exist'});

        } catch (error) {
            res.status(400).send({ msg: error });
        }

    }

    static async create( req: Request, res: Response){

        const { key, value } = req.body;
        const data = await stateService.createState({key:key, value:value});

        res.json({
            msg: 'Saved satisfactory',
            data
        });
    }

}

export default StateController;