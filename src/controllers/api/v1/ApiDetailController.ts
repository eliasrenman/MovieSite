import { Response, Request } from "express-serve-static-core"
import { movieDbGet } from 'src/shared/ApiGet';
class ApiDetailsController {

    constructor() {

    }

    
    /**
     * @swagger
     *
     * /api/v1/movie:
     *   get:
     *     description: Requests the data by id of a movie.
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         descirption: Requested id.
     *         in: query
     *         required: true
     *         type: int
     *     tags:
     *         - details
     *     responses:
     *       200:
     *         description: Successfully returns a json containing search result.
     */
    public movie(req: Request, res: Response) {
        movieDbGet(req, res, 'movie/' + req.query.id + '?language=en-US');
    } 

    /**
     * @swagger
     *
     * /api/v1/tv:
     *   get:
     *     description: Requests the data by id of a tv series.
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         descirption: Requested id.
     *         in: query
     *         required: true
     *         type: int
     *     tags:
     *         - details
     *     responses:
     *       200:
     *         description: Successfully returns a json containing search result.
     */
    public tv(req: Request, res: Response) {
        movieDbGet(req, res, 'tv/' + req.query.id + '?language=en-US');
    }

    /**
     * @swagger
     *
     * /api/v1/person:
     *   get:
     *     description: Requests the data by id of a person.
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         descirption: Requested id.
     *         in: query
     *         required: true
     *         type: int
     *     tags:
     *         - details
     *     responses:
     *       200:
     *         description: Successfully returns a json containing search result.
     */
    public person(req: Request, res: Response) {
        movieDbGet(req, res, 'person/' + req.query.id + '?language=en-US');
    }
}

export default ApiDetailsController;