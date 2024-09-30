import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger: Logger = new Logger('HTTP');

  public use(req: Request, res: Response, next: NextFunction): void {
    const { ip, method, originalUrl: url, body, headers } = req;
    const { statusCode } = res;
    const userAgent = req.get('user-agent') || '';

    //* Request 출력
    const requestMessage = { body, headers, ip, url, method, userAgent };
    this.logger.log(`Request : ${JSON.stringify(requestMessage)}`);

    //* Response 출력
    const response = res.write;
    const responseEnd = res.end;

    const chunkBuffers = [];
    res.write = (...chunks) => {
      const resArgs = chunks.map((chunk) => {
        if (!chunk) {
          res.once('drain', res.write);
        }
        return chunk;
      });

      if (resArgs[0]) {
        chunkBuffers.push(Buffer.from(resArgs[0]));
      }
      return response.apply(res, resArgs);
    };

    res.end = (...chunks) => {
      const resArgs = chunks.map((chunk) => {
        return chunk;
      });

      if (resArgs[0]) {
        chunkBuffers.push(Buffer.from(resArgs[0]));
      }

      const body = Buffer.concat(chunkBuffers).toString('utf8');

      const responseMessage = {
        statusCode,
        body: body || {},
        headers: res.getHeaders(),
      };
      this.logger.log(`Response : ${JSON.stringify(responseMessage)}`);
      return responseEnd.apply(res, resArgs);
    };

    if (next) {
      next();
    }
  }
}
