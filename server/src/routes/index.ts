import { Router }  from 'express';
import stateRoutes from './state';

const router: Router = Router();

router.use('/state', stateRoutes);

export default router;