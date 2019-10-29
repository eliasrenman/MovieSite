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
    public async movie(req: Request, res: Response) {
        res.send({
            ...await movieDbGet(req, res, 'movie/' + req.query.id + '?language=en-US'),
            ...await movieDbGet(req, res, 'movie/' + req.query.id + '/credits?language=en-US'),
        });
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
    public async tv(req: Request, res: Response) {
        res.send({
            ...await movieDbGet(req, res, 'tv/' + req.query.id + '?language=en-US'),
            ...await movieDbGet(req, res, 'tv/' + req.query.id + '/credits?language=en-US'),
        });
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
    public async person(req: Request, res: Response) {
        res.send(await movieDbGet(req, res, 'person/' + req.query.id + '?language=en-US'));
    }
}

export default ApiDetailsController;