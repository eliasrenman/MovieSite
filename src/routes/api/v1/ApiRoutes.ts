import { Router } from 'express';
import bodyParser from 'body-parser';
import {mem_cache, db_cache} from 'src/middleware/CacheMiddleware';
import ApiController from 'src/controllers/api/v1/ApiController';
import ApiSearchController from 'src/controllers/api/v1/ApiSearchController';
import ApiDetailsController from 'src/controllers/api/v1/ApiDetailController';
import ApiTopController from 'src/controllers/api/v1/ApiTopController';
const parseForm = bodyParser.urlencoded({ extended: false });
// Init router and path
const router = Router();

const EXPIRATION_TIME_SECONDS = 43200;

/**
 * Trending page showed on start page.
 */
router.get('/trending', parseForm, db_cache(EXPIRATION_TIME_SECONDS), new ApiController().trending);

/**
 * Top lists.
 */
router.get('/top/movie', parseForm, db_cache(EXPIRATION_TIME_SECONDS), new ApiTopController().movie);

router.get('/top/tv', parseForm, db_cache(EXPIRATION_TIME_SECONDS), new ApiTopController().tv);



/**
 * Multi search.
 */
router.get('/search', parseForm, db_cache(EXPIRATION_TIME_SECONDS), new ApiSearchController().search);
/**
 * Detailed search in specific category.
 */
router.get('/search/movie', parseForm, db_cache(EXPIRATION_TIME_SECONDS), new ApiSearchController().movie);

router.get('/search/tv', parseForm, db_cache(EXPIRATION_TIME_SECONDS), new ApiSearchController().tv);

router.get('/search/person', parseForm, db_cache(EXPIRATION_TIME_SECONDS), new ApiSearchController().person);

/**
 * Details on a specific id.
 */
router.get('/movie/', parseForm, db_cache(EXPIRATION_TIME_SECONDS), new ApiDetailsController().movie);

router.get('/tv/', parseForm, db_cache(EXPIRATION_TIME_SECONDS), new ApiDetailsController().tv);

router.get('/person/', parseForm, db_cache(EXPIRATION_TIME_SECONDS), new ApiDetailsController().person);

// Export the base-router
export default router;
