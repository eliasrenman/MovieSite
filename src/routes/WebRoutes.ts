import path from 'path';
import { Request, Response, Router } from 'express';
import csrf from 'csurf';
import DetailController from '../controllers/web/DetailController';

import TopController from '../controllers/web/TopController';
import SearchController from '../controllers/web/SearchController';
import TrendingController from '../controllers/web/TrendingController';

const csrfProtection = csrf({ cookie: true });

const viewsDir = path.join(__dirname, '../views');

// Init router and path
const router = Router();

/**
 * Trending pages.
 */
router.get('/', csrfProtection, new TrendingController().index);
router.get('/trending/series', csrfProtection, new TrendingController().tv);
router.get('/trending/movie', csrfProtection, new TrendingController().movie);


/**
 * Search page
 */
router.get('/search/', csrfProtection, async (req: Request, res: Response) => {
    new SearchController().index(req, res);
});

/**
 * Top list pages
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
