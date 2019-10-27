//@ts-ignore
import { MongoCache } from 'mongo-cache';

export class MemCache {
    private cache: MongoCache;
    constructor(config = {
        "collection": "cache",
        "db": process.env.MONGO_DB,
        "host": process.env.MONGO_HOST,
        "user": process.env.MONGO_USERNAME,
        "pass": process.env.MONGO_PASSWORD,
        "port": process.env.MONGO_PASSWORD || 27017
    }) {
        this.cache = new MongoCache(config);
        this.cache.connect();
    }
    

    public async get(key: string) {
        return new Promise((resolve, reject) => {
            this.cache.get(key)
            .then((res: any) => resolve(res))
            .catch((err: any) => reject(err));
        });
    }

    public async put(key: string, value: any, ttl: number = 0) {
        return new Promise((resolve, reject) => {
            this.cache.set(key, value, ttl)
            .then((res: any) => resolve(res))
            .catch((err: any) => reject(err));
        })
    }
}