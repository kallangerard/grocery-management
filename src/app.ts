'use strict';

// https://www.smashingmagazine.com/2020/04/express-api-backend-project-postgresql/

import cookieParser from 'cookie-parser';
import express, { NextFunction, Request, Response } from 'express';
import error from './exceptions/error';
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

// error handler
app.use(error);

export default app;
