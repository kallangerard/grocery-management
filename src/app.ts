'use strict';

// https://www.smashingmagazine.com/2020/04/express-api-backend-project-postgresql/

import cookieParser from 'cookie-parser';
import express, { NextFunction, Request, Response } from 'express';
import {
  default as createError,
  default as createHttpError,
} from 'http-errors';
import logger from 'morgan';
import path from 'path';
import indexRouter from './routes/api';
import productsRouter from './routes/products';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', indexRouter);
app.use('/api/v1/products', productsRouter);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

// error handler
app.use(
  (
    err: createHttpError.HttpError,
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    // set locals, only providing error in development
    const error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send({ error });
  },
);

export default app;
