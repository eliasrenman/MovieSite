import { Response, Request } from "express-serve-static-core"
import { movieDbGet } from 'src/shared/ApiGet';
class ApiDetailedSearchController {
    /**
     * Ignored.
     */
    constructor() {
    }

    /**
     * @swagger
     *
     * /api/v1/search/movie:
     *   get:
     *     description: Sends a specific search query in the movie search.
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: search
     *         description: Specified search query to lookup.
     *         in: query
     *         required: true
     *         type: int
     *     tags:
     *         - search
     *     responses:
     *       200:
     *         description: Successfully returns a json containing search result.
     */
    public movie(req: Request, res: Response) {
        movieDbGet(req, res, 'search/movie/?query=' + req.query.search);
    } 

    /**
     * @swagger
     *
     * /api/v1/search/tv:
     *   get:
     *     description: Sends a specific search query in the tv search.
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: search
     *         description: Specified search query to lookup.
     *         in: query
     *         required: true
     *         type: int
     *     tags:
     *         - search
     *     responses:
     *       200:
     *         description: Successfully returns a json containing search result.
     */
    public tv(req: Request, res: Response) {
        movieDbGet(req, res, 'search/tv?query=' + req.query.search);
    }

    /**
     * @swagger
     *
     * /api/v1/search/person:
     *   get:
     *     description: Sends a specific search query in the people search.
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: search
     *         description: Specified search query to lookup.
     *         in: query
     *         required: true
     *         type: int
     *     tags:
     *         - search
     *     responses:
     *       200:
     *         description: Successfully returns a json containing search result.
     */
    public person(req: Request, res: Response) {
        movieDbGet(req, res, 'search/person?query=' + req.query.search);
    }
}
export default ApiDetailedSearchController;