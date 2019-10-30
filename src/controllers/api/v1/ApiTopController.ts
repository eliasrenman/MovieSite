import { movieDbGet } from 'src/shared/ApiGet';
import { Request, Response } from 'express-serve-static-core';

class ApiTopController {
    
    constructor() { }

    /**
     * @swagger
     *
     * /api/v1/top/movie:
     *   get:
     *     description: Sends a specific search query in the people search.
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: page
     *         description: page number.
     *         in: query
     *         required: false
     *         type: int
     *     tags:
     *         - top list
     *     responses:
     *       200:
     *         description: Successfully returns a json containing search result.
    */
    public async movie(req: Request, res: Response) {
        
    }

    /**
     * @swagger
     *
     * /api/v1/top/tv:
     *   get:
     *     description: Sends a specific search query in the people search.
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: page
     *         description: page number.
     *         in: query
     *         required: false
     *         type: int
     *     tags:
     *         - top list
     *     responses:
     *       200:
     *         description: Successfully returns a json containing search result.
    */
    public async tv(req: Request, res: Response) {
        let page = req.query.page || 1;
        res.send(await movieDbGet('tv/top_rated', {page: page}));
    }
}

export default ApiTopController;