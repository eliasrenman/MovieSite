import cookieParser from 'cookie-parser';
import express from 'express';
import { Request, Response } from 'express';
import path from 'path';
import web from './routes/WebRoutes';
import api from './routes/api/v1/ApiRoutes';
import docs from './routes/DocsRoutes';
import bodyParser from 'body-parser';
import csrf from 'csurf';
// Init express
const app = express();

// setup route middlewares
const csrfProtection = csrf({ cookie: true });
const parseForm = bodyParser.urlencoded({ extended: false });

// Add middleware/settings/routes to express.
// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Sets Frontend rendering engine to pug
const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);
app.set('view engine', 'pug');
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));

// Declares the different routes.
app.use('/', web);
app.use('/api/v1', api);
app.use('/docs/', docs);

// error handler
app.use( (err: { code: string; }, req: Request, res: Response, next: (arg0: any) => void) => {
    if (err.code !== 'EBADCSRFTOKEN') {
        return next(err);
    }

    // handle CSRF token errors here
    res.status(403);
    res.send('Form has a invalid csrf token');
  });

export default app;
