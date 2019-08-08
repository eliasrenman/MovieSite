import { Request, Response, Router } from 'express';
import csrf from 'csurf';
import bodyParser from 'body-parser';
import axios from 'axios';

const csrfProtection = csrf({ cookie: true });
const parseForm = bodyParser.urlencoded({ extended: false });
// Init router and path
const router = Router();
const key = process.env.MDB_KEY;

router.post('/search', parseForm, csrfProtection, (req: Request, res: Response) => {
    const searchQuery = req.body.data.search.replace(' ', '%20');
    axiosGet(req, res, 'search/multi?api_key=' + key + '&language=en-US&query=' + searchQuery);
});

router.post('/trending', parseForm, csrfProtection, (req: Request, res: Response) => {
    let page = "";
    if (typeof req.body.page == 'number')
        page = "&page=" + req.body.page;
    axiosGet(req, res, 'trending/all/week?api_key=' + key + page);
});

router.post('/detail/movie', parseForm, csrfProtection, (req: Request, res: Response) => {
    axiosGet(req, res, 'movie/' + req.body.search + '?api_key=' + key);
});

router.post('/detail/tv', parseForm, csrfProtection, (req: Request, res: Response) => {
    axiosGet(req, res, 'tv/' + req.body.search + '?api_key=' + key);
});

router.post('/detail/person', parseForm, csrfProtection, (req: Request, res: Response) => {
    axiosGet(req, res, 'tv/' + req.body.search + '?api_key=' + key);
});

/**
 * This function sends a Get request to the moviedbs api.
 * @param req request
 * @param res response
 * @param url subfolder on moviedb
 */
function axiosGet(req: Request, res: Response, url: string) {
    axios.get('https://api.themoviedb.org/3/' + url)
        .then((response) => {
            res.send(response.data);
        })
        .catch((error) => {
            res.send(error);
        });
}

// Export the base-router
export default router;
