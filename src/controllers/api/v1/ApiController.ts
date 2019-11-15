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
    
}
export default ApiController;