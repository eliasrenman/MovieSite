import { Response, Request } from "express-serve-static-core";
import { internalApiGet } from '../../shared/ApiGet';
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
class TopController {
    
    /**
     * Ignored
     */
    constructor() {}
    
    public async movie(req: Request, res: Response) {
        // @ts-ignore
        let page = req.query.page || 1;
        let payload: any = await internalApiGet('api/v1/top/movie', {
            page: page, 
        });
        const csrfToken = req.csrfToken();
        payload.media_type = 'movie';
        res.render('toplist', {csrfToken: csrfToken, title: "Top movies", payload: payload});

    }
    
    public async tv(req: Request, res: Response) {
        // @ts-ignore
        let page = req.query.page || 1;
        let payload: any = await internalApiGet('api/v1/top/tv', {
            page: page, 
        });
        payload.media_type = 'tv';
        const csrfToken = req.csrfToken();
        res.render('toplist', {csrfToken: csrfToken, title: "Top series", payload: payload});
    }

    
}

export default TopController;