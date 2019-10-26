import { Router } from 'express';
import bodyParser from 'body-parser';
import {cache} from 'src/middleware/Memory';
import ApiController from 'src/controllers/api/v1/ApiController';
import ApiDetailedSearchController from 'src/controllers/api/v1/ApiCategorySearchController';
import ApiDetailsController from 'src/controllers/api/v1/ApiDetailController';
const parseForm = bodyParser.urlencoded({ extended: false });
// Init router and path
const router = Router();

router.get('/trending', parseForm, cache(43200), new ApiController().trending);

router.get('/search', parseForm, new ApiController().search);

/**
 * Detailed search in specific category.
 */
router.get('/search/movie', parseForm, new ApiDetailedSearchController().movie);

router.get('/search/tv', parseForm, new ApiDetailedSearchController().tv);

router.get('/search/person', parseForm, new ApiDetailedSearchController().person);

router.get('/movie/', parseForm, new ApiDetailsController().movie);

router.get('/tv/', parseForm, new ApiDetailsController().tv);

router.get('/person/', parseForm, new ApiDetailsController().person);

// Export the base-router
export default router;
