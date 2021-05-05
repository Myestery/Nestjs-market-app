import { Document } from 'mongoose';
export interface User extends Document {
  id?: string;
  name: Object;
  userName: string;
  password: string;
}
