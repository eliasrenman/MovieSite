import path from 'path';
import { Request, Response, Router } from 'express';
import csrf from 'csurf';
import DetailController from 'src/controllers/web/DetailController';
import { internalApiGet } from 'src/shared/ApiGet';
import TopController from 'src/controllers/web/TopController';

const csrfProtection = csrf({ cookie: true });

const viewsDir = path.join(__dirname, '../views');

// Init router and path
const router = Router();

/**
 * Renders home page.
 */
router.get('/', csrfProtection, (req: Request, res: Response) => {
    const csrfToken = req.csrfToken();
    res.render('index', {csrfToken: csrfToken, title: "Home"});
});

router.get('/search/', csrfProtection, async (req: Request, res: Response) => {
    let page = req.query.page || 1;
    let payload: any = undefined;
    let category = undefined;
    switch (req.query.category) {
        case 'tv': {
            category = '/tv';
            break;
        }
        case 'movie': {
            category = '/movie';
            break;
        }
        case 'person': {
            category = '/person';
            break;
        }
        default: {
            category = '';
            break;
        }
    }

    if(req.query.query) {
        payload = await internalApiGet('api/v1/search' + category, {
            query: req.query.query || '',
            page: page, 
        });
    }
    
    const csrfToken = req.csrfToken();
    res.render('search', {csrfToken: csrfToken, title: 'Search', payload: payload});
});

/**
 * Top list routes
 */
router.get('/toplist', (req: Request, res: Response) => {
    res.redirect('/toplist/movie/');
});

router.get('/toplist/movie/', csrfProtection, async  (req: Request, res: Response) => {
    new TopController().movie(req, res); 
});
router.get('/toplist/series', csrfProtection, async  (req: Request, res: Response) => {
    new TopController().tv(req, res); 
});

/**
 * Detail pages
 */
router.get('/movie/:id', csrfProtection, async  (req: Request, res: Response) => {
    new DetailController().movie(req, res); 
});
router.get('/series/:id', csrfProtection, async  (req: Request, res: Response) => {
    new DetailController().tv(req, res); 
});
router.get('/person/:id', csrfProtection, async  (req: Request, res: Response) => {
    new DetailController().person(req, res); 
});

// Export the base-router
export default router;
