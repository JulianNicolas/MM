import { validationResult } from 'express-validator';
import { StateError }       from '../interfaces/stateError';

const stateValidate = ({key, value}:{key:string, value:string}) => {

    const errors: StateError[] = [];

    if ( !key || typeof key !== 'string') errors.push({'key': 'A valid key is required'})
    if ( !value || typeof value !== 'string') errors.push({'value': 'A valid value is required'})

    return errors;

}

const validateFields = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        const message = getFinalMessage(errors);
        return res.status(400).json({...errors, message});
    }
    next();
}

const getFinalMessage = (errors) => {
    return errors ? errors.errors.map(e => e.msg).join('. ') : '';
}

export = {
    stateValidate,
    validateFields
}