import { Router } from 'express';
import bodyParser from 'body-parser';
import {mem_cache, db_cache} from 'src/middleware/Memory';
import ApiController from 'src/controllers/api/v1/ApiController';
import ApiDetailedSearchController from 'src/controllers/api/v1/ApiCategorySearchController';
import ApiDetailsController from 'src/controllers/api/v1/ApiDetailController';
const parseForm = bodyParser.urlencoded({ extended: false });
// Init router and path
const router = Router();

router.get('/trending', parseForm, mem_cache(43200), new ApiController().trending);

router.get('/search', parseForm, db_cache(43200), new ApiController().search);

/**
 * Detailed search in specific category.
 */
router.get('/search/movie', parseForm, db_cache(43200), new ApiDetailedSearchController().movie);

router.get('/search/tv', parseForm, db_cache(43200), new ApiDetailedSearchController().tv);

router.get('/search/person', parseForm, db_cache(43200), new ApiDetailedSearchController().person);

router.get('/movie/', parseForm, db_cache(43200), new ApiDetailsController().movie);

router.get('/tv/', parseForm, db_cache(43200), new ApiDetailsController().tv);

router.get('/person/', parseForm, db_cache(43200), new ApiDetailsController().person);

// Export the base-router
export default router;
