import express from 'express';
import { getByUpc } from '../controllers/upcLookupController';

export const upcLookupRouter = express.Router();

upcLookupRouter.route('/:upc').get(getByUpc);
