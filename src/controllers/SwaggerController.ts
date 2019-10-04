import { Request, Response } from 'express';
import path from 'path';
/**
 * Contains the Openapi json file.
 */
class SwaggerController {
    
    /**
     * Ignored.
     */
    constructor() {}
    /**
     * This renders the Swagger documentation page.
     * @param req request
     * @param res response
     */
    index(req: Request, res: Response) {
        const viewsDir = path.join(__dirname, '../views/docs/');
        res.sendFile(viewsDir + 'index.html');
    }

    /**
     * Returns the Swagger json file.
     *
     * @param req request body
     * @param res Response.
     */
    fetch(req: Request, res: Response) {
        const swaggerJSDoc = require('swagger-jsdoc');

        const options = {
            definition: {
                openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
                info: {
                    title: 'Movie site api',
                    version: '1.0.0',
                },
            },
            apis: ['**/*.ts'],
        };
        res.json(swaggerJSDoc(options));
    }
}

export default SwaggerController;