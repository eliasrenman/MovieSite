import { Response, Request } from "express-serve-static-core"
import memory from 'memory-cache';

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
            console.log('read request from cache');
            return;
        } else {
            //@ts-ignore
            res.sendResponse = res.send;
            console.log('cached new request');
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
 * Caches to a mongo database
 * 
 * @param duration 
 */
function db_cache(duration: number) {
    return (req: Request, res: Response, next: any) => {
        let cache = new MongoCache({
            collection: 'cache',
            db: 'test',
            host: 'localhost',
            pass: '',
            user: 'admin'  
          })

        let key = '__express__' + req.originalUrl || req.url;
        key += "?page=" + req.body.page;
        
        let cachedBody = cache.get(key);
        if (cachedBody) {
            res.send(cachedBody);
            console.log('read request from cache');
            return;
        } else {
            //@ts-ignore
            res.sendResponse = res.send;
            console.log('cached new request');
            //@ts-ignore
            res.send = (body) => {
            cache.set(key, body, duration * 1000);
            //@ts-ignore
            res.sendResponse(body);
            }
            next();
        }
    }
};
export {mem_cache, db_cache};