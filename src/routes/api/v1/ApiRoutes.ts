import { Router } from 'express';
import bodyParser from 'body-parser';
import {mem_cache, db_cache} from 'src/middleware/CacheMiddleware';
import ApiController from 'src/controllers/api/v1/ApiController';
import ApiDetailedSearchController from 'src/controllers/api/v1/ApiCategorySearchController';
import ApiDetailsController from 'src/controllers/api/v1/ApiDetailController';
const parseForm = bodyParser.urlencoded({ extended: false });
// Init router and path
const router = Router();

const EXPIRATION_TIME_SECONDS = 43200;


router.get('/trending', parseForm, db_cache(EXPIRATION_TIME_SECONDS), new ApiController().trending);

router.get('/search', parseForm, db_cache(EXPIRATION_TIME_SECONDS), new ApiController().search);

/**
 * Detailed search in specific category.
 */
router.get('/search/movie', parseForm, db_cache(EXPIRATION_TIME_SECONDS), new ApiDetailedSearchController().movie);

router.get('/search/tv', parseForm, db_cache(EXPIRATION_TIME_SECONDS), new ApiDetailedSearchController().tv);

router.get('/search/person', parseForm, db_cache(EXPIRATION_TIME_SECONDS), new ApiDetailedSearchController().person);

router.get('/movie/', parseForm, db_cache(EXPIRATION_TIME_SECONDS), new ApiDetailsController().movie);

router.get('/tv/', parseForm, db_cache(EXPIRATION_TIME_SECONDS), new ApiDetailsController().tv);

router.get('/person/', parseForm, db_cache(EXPIRATION_TIME_SECONDS), new ApiDetailsController().person);

// Export the base-router
export default router;
