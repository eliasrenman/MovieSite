import { Request, Response } from "express-serve-static-core";
import { internalApiGet } from '../../shared/ApiGet';

class SearchController {
    public async index(req: Request, res: Response) {
        
        let payload: any = await this.getPayload(
            req.query.query, 
            req.query.page || 1, 
            this.getCategory(req.query.category)
        );

        const csrfToken = req.csrfToken();
        res.render('search', {csrfToken: csrfToken, title: 'Search', payload: payload, query: req.query.query});
    }

    public async getPayload(query: string, page: number, category: string) {
        if(query) {
            return await internalApiGet('api/v1/search' + category, {
                query: query || '',
                page: page, 
            });
        }
    }

    public getCategory(categoryRaw: string | undefined) {
        switch (categoryRaw) {
            case 'tv': {
                return '/tv';
            }
            case 'movie': {
                return  '/movie';
            }
            case 'person': {
                return  '/person';
            }
            default: {
                return  '';
            }
        }
    }
} 
export default SearchController;