import axios from 'axios';
import { Response, Request } from "express-serve-static-core"

/**
 * This function sends a Get request to the moviedbs api.
 * @param url subfolder on moviedb
 * @returns {Promise} promise
 */
async function movieDbGet(url: string, payload: Object = {}) {
    const key = process.env.MDB_KEY;
    return (await axiosGet(
        'https://api.themoviedb.org/3/' + url, {api_key: key, ...payload})).data;
}

/**
 * Sends a axios get request to a url.
 * 
 * @param url 
 * @param payload optional payload to send with get request.
 * @returns {Promise} data or a error
 */
function axiosGet(url: string, payload: Object = {}): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        axios.get(url, {params: payload})
        .then((response) => {
            resolve(response);
        })
        .catch((error) => {
            reject(error);
        });
    });
}

export {movieDbGet, axiosGet};