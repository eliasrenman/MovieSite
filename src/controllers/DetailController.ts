import { Response, Request } from "express-serve-static-core";
import { axiosGet } from 'src/shared/ApiGet';

class DetailController {
    
    /**
     * Ignored
     */
    constructor() {}
    
    public async movie(req: Request, res: Response) {
        // @ts-ignore
        res.send((await this.loadPayload(req, '/api/v1/movie')).data);
    }
    
    public async tv(req: Request, res: Response) {
        // @ts-ignore
        res.send((await this.loadPayload(req, '/api/v1/tv')).data);
    }
    
    public async person(req: Request, res: Response) {
        // @ts-ignore
        res.send((await this.loadPayload(req, '/api/v1/person')).data);
    }

    private async loadPayload(req: Request, type:string) {
        let url = req.protocol + 
            '://' + 
            req.get('host') + 
            type + 
            '/';
        return await axiosGet(url, {id: req.params.id})
    }
}


export default DetailController;