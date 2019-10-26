import { Response, Request } from "express-serve-static-core"
import { axiosGet } from '../../../shared/ApiGet';
class ApiController {
    
    /**
     * Ignored.
     */
    constructor() {
    }

    /**
     * Trending controller logic
     * 
     * @param req Request
     * @param res Response
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
     *         - collection
     *     responses:
     *       200:
     *         description: Successfully returns a json containing 20 movies.
     */
    public trending(req: Request, res: Response) {
            let page = "";
        if (!isNaN(req.query.page))
            page = "page=" + req.query.page;
        axiosGet(req, res, 'trending/all/week?'+ page);
    }
    /**
     * Search controller logic
     * 
     * @param req Request
     * @param res Response
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
     *         - search
     *     responses:
     *       200:
     *         description: Successfully returns the result of a search query.
     */
    public search(req: Request, res: Response)   {
        const searchQuery = req.query.search.replace(' ', '%20');
        axiosGet(req, res, 
            'search/multi?language=en-US&query=' + searchQuery);
    }
}
export default ApiController;