import { Router } from 'express';
import SwaggerController from '../controllers/SwaggerController';
import {cache} from '../middleware/Memory';

// Init router and path
const router = Router();
/**
 * Gets the Swagger routes as json
 */
router.get('/raw',cache(143200), new SwaggerController().fetch);

/**
 * Gets the swagger ui site and which then loads the json.
 */
router.get('/', new SwaggerController().index);

// Export the base-router
export default router;
