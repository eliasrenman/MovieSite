import { Response, Request } from "express-serve-static-core"
import memory from 'memory-cache';
/**
 * Memory chaching middleware
 */
/**
 * This will cache a request for x amount of seconds.
 * 
 * @param duration number of seconds request gets cached
 */
export function cache(duration: number) {
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
    }
  