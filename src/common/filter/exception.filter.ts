import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class ExecptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {}
}
