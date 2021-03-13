import { NextFunction, Request, Response } from 'express';
import HttpException from '../utils/exceptions/http_exception';
 
function errorMiddleware(err: HttpException, req: Request, res: Response, next: NextFunction): void {
    const status = err.status || 500;
    const message = err.message || 'Unknown error';

    res.status(status).send({
        status,
        message,
    });
}
 
export default errorMiddleware;
