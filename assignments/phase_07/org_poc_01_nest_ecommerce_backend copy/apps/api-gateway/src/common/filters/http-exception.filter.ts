import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionReponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    let message = 'Internal server error';

    if (typeof exceptionReponse === 'string') {
      message = exceptionReponse;
    } else if (
      typeof exceptionReponse === 'object' &&
      exceptionReponse !== null
    ) {
      const errorResponse = exceptionReponse as Record<string, unknown>;

      message =
        typeof errorResponse.message === 'string'
          ? errorResponse.message
          : JSON.stringify(errorResponse.message);
    }

    response.status(status).json({
      success: false,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message,
    });
  }
}
