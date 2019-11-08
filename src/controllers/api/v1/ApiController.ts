import { Response, Request } from "express-serve-static-core";
import { movieDbGet } from '../../../shared/ApiGet';
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
    public async trending(req: Request, res: Response) {
            let page = "";
        if (!isNaN(req.query.page))
            page = "page=" + req.query.page;
            res.send(await movieDbGet('trending/all/week?'+ page));
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
     *       - name: query
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
    public async search(req: Request, res: Response)   {
        const page = req.query.page || 1;
        console.log("Request query", req.query.query);
        
        if(req.query.query == null || !req.query.query) {
            res.status(400)
                .send({"error": "The query Param is missing or is null"});
            return;
        }
        res.send(await movieDbGet( 
            'search/multi', {
                query: req.query.query,
                page: page,
                language: "en-US"
            }));
    }
}
export default ApiController;