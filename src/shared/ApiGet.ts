import axios from 'axios';
import { Response, Request } from "express-serve-static-core"

/**
 * This function sends a Get request to the moviedbs api.
 * @param req request
 * @param res response
 * @param url subfolder on moviedb
 */
export function axiosGet(req: Request, res: Response, url: string) {
    const key = process.env.MDB_KEY;
    axios.get('https://api.themoviedb.org/3/' + url + '&api_key=' + key)
        .then((response) => {
            res.send(response.data);
        })
        .catch((error) => {
            res.send(error);
        });
}
