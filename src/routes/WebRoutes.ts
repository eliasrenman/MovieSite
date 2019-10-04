import path from 'path';
import { Request, Response, Router } from 'express';
import csrf from 'csurf';

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

// Export the base-router
export default router;
