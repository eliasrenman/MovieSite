import path from 'path';
import { Router } from 'express';
import csrf from 'csurf';
import SwaggerController from '../controllers/SwaggerController';


// Init router and path
const router = Router();

router.get('/raw', new SwaggerController().fetch);

router.get('/', new SwaggerController().index);

// Export the base-router
export default router;
