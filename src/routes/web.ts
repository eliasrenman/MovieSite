import path from 'path';
import { Request, Response, Router } from 'express';
import csrf from 'csurf';

const csrfProtection = csrf({ cookie: true });

const viewsDir = path.join(__dirname, '../views');

// Init router and path
const router = Router();

router.get('/', csrfProtection, (req: Request, res: Response) => {
    res.render('index', {csrfToken: req.csrfToken()});
});

// Export the base-router
export default router;
