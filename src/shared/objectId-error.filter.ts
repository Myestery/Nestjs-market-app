import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

interface ObjectIdError {
  stringValue?: string;
  kind: string;
  value?: string;
  path: string;
}
@Catch()
export class ObjectIdErrorFilter implements ExceptionFilter {
  catch(exception: ObjectIdError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const status = 404;
    const errorResponse = {
      status,
      timestamp: new Date().toLocaleDateString(),
      path: request.url,
      method: request.method,
      message: 'Not Found'
    };
    response.status(status).json(errorResponse);
  }
}
