import { Router }      from 'express';
import { check, query }       from 'express-validator';
import validate        from './../utils/validate';
import StateController from '../controllers/state';

const router = Router();

router.get('/', 
    query('key', 'The key must not be empty').not().isEmpty(),
    query('key', 'The key type must be string').isString(),
    validate.validateFields,
    StateController.fetchOne
);
router.post('/', StateController.create);

export default router;
