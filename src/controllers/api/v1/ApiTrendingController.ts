import { Response, Request } from "express-serve-static-core";
import { movieDbGet } from '../../../shared/ApiGet';
class ApiTrendingController {
    
    /**
     * Ignored.
     */
    constructor() {
    }

    /**
     * 
     * @param req Request
     * @param res Response
     * @swagger
     *
     * /api/v1/trending:
     *   get:
     *     description: Sends request to get 20 trending movies and series.
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: page
     *         description: Specified page to get trending movies from.
     *         in: query
     *         required: false
     *         type: int
     *     tags:
     *         - trending
     *     responses:
     *       200:
     *         description: Successfully returns a json containing 20 movies and series.
     */
    public async index(req: Request, res: Response) {
        let page = "";
        if (!isNaN(req.query.page))
            page = "page=" + req.query.page;
        res.send(await movieDbGet('trending/all/week?'+ page));
    }
    
    /**
     * 
     * @param req Request
     * @param res Response
     * @swagger
     *
     * /api/v1/trending/tv:
     *   get:
     *     description: Sends request to get 20 trending series.
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: page
     *         description: Specified page to get trending series from.
     *         in: query
     *         required: false
     *         type: int
     *     tags:
     *         - trending
     *     responses:
     *       200:
     *         description: Successfully returns a json containing 20 series.
     */
    public async tv(req: Request, res: Response) {
        let page = "";
        if (!isNaN(req.query.page))
            page = "page=" + req.query.page;
        res.send(await movieDbGet('trending/tv/week?'+ page));
    }
    /**
     * 
     * @param req Request
     * @param res Response
     * @swagger
     *
     * /api/v1/trending/movie:
     *   get:
     *     description: Sends request to get 20 trending movies.
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: page
     *         description: Specified page to get trending movies from.
     *         in: query
     *         required: false
     *         type: int
     *     tags:
     *         - trending
     *     responses:
     *       200:
     *         description: Successfully returns a json containing 20 movies.
     */
    public async movie(req: Request, res: Response) {
        let page = "";
        if (!isNaN(req.query.page))
            page = "page=" + req.query.page;
        res.send(await movieDbGet('trending/movie/week?'+ page));
    }
    
}
export default ApiTrendingController;