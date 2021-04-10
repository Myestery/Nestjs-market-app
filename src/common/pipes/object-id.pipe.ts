import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  HttpException,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ObjectIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return (isValidObjectId(value) && value) || this.badValue();
  }
  badValue() {
    throw new HttpException('Invalid id', 422);
  }
}
