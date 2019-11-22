import { Request, Response } from 'express-serve-static-core';

class TrendingController {

    public index(req: Request, res: Response) {
        res.render('index', {title: "Home"});
    }

    public tv(req: Request, res: Response) {
        res.render('index', {title: "Trending Series"});
    }
    
    public movie(req: Request, res: Response) {
        res.render('index', {title: "Trending Movies"});
    }
}
export default TrendingController;