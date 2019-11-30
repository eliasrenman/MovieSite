import { Response, Request } from "express-serve-static-core"
import memory from 'memory-cache';
import { DbCache } from '../shared/SqliteCache';

/**
 * Memory chaching middleware
 * This will cache a request for x amount of seconds.
 * 
 * @param duration number of seconds request gets cached
 */
function mem_cache(duration: number) {
    return (req: Request, res: Response, next: any) => {
        let key = '__express__' + req.originalUrl || req.url;
        key += "?page=" + req.body.page;
        
        let cachedBody = memory.get(key);
        if (cachedBody) {
            res.send(cachedBody);
            console.log('read request from memory cache');
            return;
        } else {
            //@ts-ignore
            res.sendResponse = res.send;
            console.log('cached new memory request');
            //@ts-ignore
            res.send = (body) => {
            memory.put(key, body, duration * 1000);
            //@ts-ignore
            res.sendResponse(body);
            }
            next();
        }
    }
};

/**
 * database chaching middleware
 * This will cache a request for x amount of seconds.
 * 
 * @param duration number of seconds request gets cached
 */
function db_cache(duration: number) {
    return async (req: Request, res: Response, next: any) => {
        let cache: DbCache = new DbCache();

        let key = '__express__' + req.originalUrl || req.url;
        key += "?page=" + req.body.page;
        
        let cachedBody = await cache.get(key);
        if (cachedBody) {
            res.send(cachedBody);
            console.log('read request from database cache');
            return;
        } else {
            //@ts-ignore
            res.sendResponse = res.send;
            console.log('cached new database request');
            //@ts-ignore
            res.send = (body) => {
                cache.put(key, body, duration * 1000);
                //@ts-ignore
                res.sendResponse(body);
            }
            next();
        }
    }
};
export {mem_cache, db_cache};