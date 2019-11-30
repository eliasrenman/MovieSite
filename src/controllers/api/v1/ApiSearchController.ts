import { Response, Request } from "express-serve-static-core"
import { movieDbGet } from '../../../shared/ApiGet';
class ApiSearchController {
    /**
     * Ignored.
     */
    constructor() {
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
     *         type: int
     *       - name: page
     *         description: page number.
     *         in: query
     *         required: false
     *         type: int
     *     tags:
     *         - search
     *     responses:
     *       200:
     *         description: Successfully returns the result of a search query.
     */
    public async search(req: Request, res: Response)   {
        ApiSearchController.sendSearchRequest(req, res, 'search/multi');
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
     *       - name: query
     *         description: Specified search query to lookup.
     *         in: query
     *         required: true
     *         type: int
     *       - name: page
     *         description: page number.
     *         in: query
     *         required: false
     *         type: int
     *     tags:
     *         - search
     *     responses:
     *       200:
     *         description: Successfully returns a json containing search result.
     */
    public async movie(req: Request, res: Response) {
        ApiSearchController.sendSearchRequest(req, res, 'search/movie/');
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
     *       - name: query
     *         description: Specified search query to lookup.
     *         in: query
     *         required: true
     *         type: int
     *       - name: page
     *         description: page number.
     *         in: query
     *         required: false
     *         type: int
     *     tags:
     *         - search
     *     responses:
     *       200:
     *         description: Successfully returns a json containing search result.
     */
    public async tv(req: Request, res: Response) {
        ApiSearchController.sendSearchRequest(req, res, 'search/tv')
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
     *       - name: query
     *         description: Specified search query to lookup.
     *         in: query
     *         required: true
     *         type: int
     *       - name: page
     *         description: page number.
     *         in: query
     *         required: false
     *         type: int
     *     tags:
     *         - search
     *     responses:
     *       200:
     *         description: Successfully returns a json containing search result.
     */
    public async person(req: Request, res: Response) {
        ApiSearchController.sendSearchRequest(req, res, 'search/person');
    }

    public static async sendSearchRequest(req: Request, res: Response, endpoint: string) {
        const page = req.query.page || 1;
        
        if(req.query.query == null || !req.query.query) {
            res.status(400)
                .send({"error": "The query Param is missing or is null"});
            return;
        }
        res.send(await movieDbGet( 
            endpoint, {
                query: req.query.query,
                page: page,
                language: "en-US"
            }));
    }
}
export default ApiSearchController;