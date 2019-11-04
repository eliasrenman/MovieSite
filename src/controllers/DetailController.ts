import { Response, Request } from "express-serve-static-core";
import { internalApiGet } from 'src/shared/ApiGet';
interface PayloadModel {
    backdrop_path: string,
    title: string,
    name: string,
    overview: string,
    poster_path: string,
    vote_average: number,
    vote_count: number,
    genres: [
        {
            id: number,
            name: string
        }
    ],
    type: string
}
class DetailController {
    
    /**
     * Ignored
     */
    constructor() {}
    
    public async movie(req: Request, res: Response) {
        // @ts-ignore
        let payload: PayloadModel = await internalApiGet('/api/v1/movie', {id: req.params.id});
        payload.type = 'movie';
        const csrfToken = req.csrfToken();
        res.render('details', {csrfToken: csrfToken, title: payload.title, payload: payload});

    }
    
    public async tv(req: Request, res: Response) {
        // @ts-ignore
        let payload: PayloadModel = await internalApiGet('/api/v1/tv', {id: req.params.id});
        payload.type = 'series';
        const csrfToken = req.csrfToken();
        res.render('details', {csrfToken: csrfToken, title: payload.name, payload: payload});
    }
    
    public async person(req: Request, res: Response) {
        // @ts-ignore
        res.send(await internalApiGet('/api/v1/person'));
    }
}

export default DetailController;