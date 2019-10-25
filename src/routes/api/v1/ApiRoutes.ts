import { Request, Response, Router } from 'express';
import csrf from 'csurf';
import bodyParser from 'body-parser';
import {cache} from '../../../middleware/Memory';
import ApiController from 'src/controllers/ApiController';
import { axiosGet } from '../../../shared/ApiGet';
const csrfProtection = csrf({ cookie: true });
const parseForm = bodyParser.urlencoded({ extended: false });
// Init router and path
const router = Router();
const key = process.env.MDB_KEY;
router.get('/search', parseForm, new ApiController().search);

router.get('/trending', parseForm, cache(43200), new ApiController().trending);

/**
 * @swagger
 *
 * /api/v1/search/movie:
 *   post:
 *     description: Sends a specific search query in the movie category.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: search
 *         description: Specified search query to lookup.
 *         in: query
 *         required: true
 *         type: int
 *       - name: token
 *         description: CSRF Token to stop cross-site requests.
 *         in: query
 *         required: true
 *         type: string
 *     tags:
 *         - api-detalied
 *     responses:
 *       200:
 *         description: Successfully returns a json containing search result.
 */
router.post('/search/movie', parseForm, csrfProtection, (req: Request, res: Response) => {
    axiosGet(req, res, 'movie/' + req.body.search);
});

/**
 * @swagger
 *
 * /api/v1/search/tv:
 *   post:
 *     description: Sends a specific search query in the tv category.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: search
 *         description: Specified search query to lookup.
 *         in: query
 *         required: true
 *         type: int
 *       - name: token
 *         description: CSRF Token to stop cross-site requests.
 *         in: query
 *         required: true
 *         type: string
 *     tags:
 *         - api-detalied
 *     responses:
 *       200:
 *         description: Successfully returns a json containing search result.
 */
router.post('/search/tv', parseForm, csrfProtection, (req: Request, res: Response) => {
    axiosGet(req, res, 'tv/' + req.body.search + '?api_key=' + key);
});

/**
 * @swagger
 *
 * /api/v1/search/person:
 *   post:
 *     description: Sends a specific search query in the people category.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: search
 *         description: Specified search query to lookup.
 *         in: query
 *         required: true
 *         type: int
 *       - name: token
 *         description: CSRF Token to stop cross-site requests.
 *         in: query
 *         required: true
 *         type: string
 *     tags:
 *         - api-detalied
 *     responses:
 *       200:
 *         description: Successfully returns a json containing search result.
 */
router.post('/search/person', parseForm, csrfProtection, (req: Request, res: Response) => {
    axiosGet(req, res, 'tv/' + req.body.search + '?api_key=' + key);
});



// Export the base-router
export default router;
