import cookieParser from 'cookie-parser';
import express from 'express';
import { Request, Response } from 'express';
import logger from 'morgan';
import path from 'path';
import web from './routes/web';
import api from './routes/api';
import csrf from 'csurf';
import bodyParser from 'body-parser';
// Init express
const app = express();

// setup route middlewares
const csrfProtection = csrf({ cookie: true });
const parseForm = bodyParser.urlencoded({ extended: false });

// Add middleware/settings/routes to express.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);
app.set('view engine', 'pug');
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));

app.use('/', web);
app.use('/api', api);
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
