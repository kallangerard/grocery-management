import { NextFunction, Request, Response, ErrorRequestHandler } from 'express';

const error = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(err || 'undefined');
  res.status(500).send(err);
};

export default error;
