import { Response } from 'express';
/**
 * Contains the Openapi json file.
 */
class SwaggerController {
    
    /**
     * Ignored.
     */
    constructor() {}
    
    /**
     * Returns the Swagger json file.
     *
     * @param req request body
     * @param res Response.
     */
    index(req: Request, res: Response) {
        const swaggerJSDoc = require('swagger-jsdoc');

        const options = {
            definition: {
                openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
                info: {
                    title: 'Movie site api',
                    version: '1.0.0',
                },
            },
            apis: ['../routes/api/**/*.ts'],
        };
        res.json(swaggerJSDoc(options));
    }
}
