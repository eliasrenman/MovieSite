import path from 'path';
import { Request, Response, Router } from 'express';
import csrf from 'csurf';
import DetailController from 'src/controllers/DetailController';

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
