import { Request, Response, Router } from 'express';
import csrf from 'csurf';
import bodyParser from 'body-parser';
import axios from 'axios';
import {cache} from '../../../middleware/Memory';
const csrfProtection = csrf({ cookie: true });
const parseForm = bodyParser.urlencoded({ extended: false });
// Init router and path
const router = Router();
const key = process.env.MDB_KEY;

/**
 * @swagger
 *
 * /api/v1/search:
 *   get:
 *     description: Sends a general search query expecting a json as a response.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: search
 *         description: Specified search query to lookup.
 *         in: query
 *         required: true
 *         type: string
 *     tags:
 *         - api
 *     responses:
 *       200:
 *         description: Successfully returns the result of a search query.
 */
router.get('/search', parseForm, (req: Request, res: Response) => {
    const searchQuery = req.body.data.search.replace(' ', '%20');
    axiosGet(req, res, 'search/multi?api_key=' + key + '&language=en-US&query=' + searchQuery);
});

/**
 * @swagger
 *
 * /api/v1/trending:
 *   get:
 *     description: Sends request to get 20 trending movies.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: page
 *         description: Specified page to get trending movies from.
 *         in: query
 *         required: true
 *         type: int
 *     tags:
 *         - api
 *     responses:
 *       200:
 *         description: Successfully returns a json containing 20 movies.
 */
router.get('/trending', parseForm, cache(43200), (req: Request, res: Response) => {
    let page = "";
    if (!isNaN(req.query.page))
        page = "&page=" + req.query.page;
    axiosGet(req, res, 'trending/all/week?api_key=' + key + page);
});

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
    axiosGet(req, res, 'movie/' + req.body.search + '?api_key=' + key);
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


/**
 * This function sends a Get request to the moviedbs api.
 * @param req request
 * @param res response
 * @param url subfolder on moviedb
 */
function axiosGet(req: Request, res: Response, url: string) {
    axios.get('https://api.themoviedb.org/3/' + url)
        .then((response) => {
            res.send(response.data);
        })
        .catch((error) => {
            res.send(error);
        });
}

// Export the base-router
export default router;
