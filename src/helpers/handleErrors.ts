import express from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

// According to http://expressjs.com/en/guide/error-handling.html:
// > Starting with Express 5, route handlers and middleware that return a Promise
// > will call next(value) automatically when they reject or throw an error.
// However, express 5 is still in alpha. See http://expressjs.com/en/guide/migrating-5.html
// Hence, we need the following wrapper function.

export const handleErrors =
  (
    asyncExpressHandlerFn: (
      arg0: express.Request<
        ParamsDictionary,
        any,
        any,
        ParsedQs,
        Record<string, any>
      >,
      arg1: express.Response<any, Record<string, any>>,
      arg2: express.NextFunction
    ) => any
  ) =>
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      return await asyncExpressHandlerFn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
