import { Document } from 'mongoose';
export interface User extends Document {
  id?: string;
  name: [];
  userName: string;
  password: string;
}
