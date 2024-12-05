import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { IErrorResponse } from 'src/interfaces/core/IErrorResponse.interface';
import { TypeORMError } from 'typeorm';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    console.log('----------------> Ngoại lệ <----------------');

    const responseErr =
      exception.getResponse() as IErrorResponse;
    let errMessage: string;

    if (typeof responseErr.message === 'object' && responseErr.message) {
      errMessage = responseErr.message[0];
    } else {

    } errMessage = responseErr.message;

    const statusCode = responseErr?.statusCode || 500;

    const resultError: IErrorResponse = {
      statusCode,
      error: responseErr?.error || 'Some thing went wrong',
      message: errMessage,
      path: request.url,
      timestamp: new Date().toISOString(),
    };

    response.status(statusCode).json(resultError);
  }
}

console.log('----------------> Lỗi databases <----------------');
@Catch(TypeORMError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const regex = /'([^']+)'/;
    const match = exception.message.match(regex);

    console.log('exception:::', exception);

    console.log('match[1]:::', exception.message);
    console.log('match[1]:::', exception.name);

    const col = match[1];

    console.log('col:::', col);

    const resultErrorTypeOrm: IErrorResponse = {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      error: ReasonPhrases.INTERNAL_SERVER_ERROR,
      message: exception.message,
      path: request.url,
      timestamp: new Date().toISOString(),
    };

    response.status(500).json(resultErrorTypeOrm);
  }
}
