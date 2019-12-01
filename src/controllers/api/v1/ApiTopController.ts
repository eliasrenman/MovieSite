import { movieDbGet } from '../../../shared/ApiGet';
import { Request, Response } from 'express-serve-static-core';

class ApiTopController {
    
    constructor() { }

    /**
     * @swagger
     *
     * /api/v1/top/movie:
     *   get:
     *     description: Gets 20 top list entries in the movie category.
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
     *         description: Successfully returns a json containing tmdb response.
    */
    public async movie(req: Request, res: Response) {
        let page = req.query.page || 1;
        res.send(await movieDbGet('movie/top_rated', {page: page}));
    }

    /**
     * @swagger
     *
     * /api/v1/top/tv:
     *   get:
     *     description: Gets 20 top list entries in the tv category.
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
     *         description: Successfully returns a json containing tmdb response.
    */
    public async tv(req: Request, res: Response) {
        let page = req.query.page || 1;
        res.send(await movieDbGet('tv/top_rated', {page: page}));
    }
}

export default ApiTopController;