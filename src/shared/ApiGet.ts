import axios from 'axios';
import { Response, Request } from "express-serve-static-core"

/**
 * This function sends a Get request to the moviedbs api.
 * @param req request
 * @param res response
 * @param url subfolder on moviedb
 */
const movieDbGet = (req: Request, res: Response, url: string, payload: Object = {}) => {
    const key = process.env.MDB_KEY;
    axiosGet(
        'https://api.themoviedb.org/3/' + url, {api_key: key, ...payload})
        .then((response:any) => {
            res.send(response.data);
        })
        .catch((error:any) => {
            res.send(error);
        });
}

/**
 * Sends a axios get request to a url.
 * 
 * @param url 
 * @param payload optional payload to send with get request.
 * @returns {Promise} data or a error
 */
const axiosGet = (url: string, payload: Object = {}): Promise<any> => 
    new Promise<any>((resolve, reject) => {
        axios.get(url, {params: payload})
        .then((response) => {
            resolve(response);
        })
        .catch((error) => {
            reject(error);
        });
    });

export {movieDbGet, axiosGet};