import express from 'express';
import { handleErrors } from '../../helpers/handleErrors';
import {
  getCreatorController,
  getCreatorsController,
  createCreatorController,
  updateCreatorController,
  deleteCreatorController
} from './controllers/creator.controller';

const router: express.Router = express.Router();

router.get('/', handleErrors(getCreatorsController));
router.get('/:id', handleErrors(getCreatorController));
router.post('/', handleErrors(createCreatorController));
router.patch('/:id', handleErrors(updateCreatorController));
router.delete('/:id', handleErrors(deleteCreatorController));

export const creatorRoutes = router;
