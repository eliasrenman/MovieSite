import { Request, Response, Router } from 'express';
import csrf from 'csurf';
import bodyParser from 'body-parser';

const csrfProtection = csrf({ cookie: true });
const parseForm = bodyParser.urlencoded({ extended: false });
// Init router and path
const router = Router();

// This is a example post request it will appear under /api/process
router.post('/process', parseForm, csrfProtection, (req: Request, res: Response) => {
    res.send('data is being processed');
});
// Export the base-router
export default router;
