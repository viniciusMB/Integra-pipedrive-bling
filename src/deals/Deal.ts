import { Document } from 'mongoose';

export class Deal extends Document {
  wonDay: string;
  totalValue: number;
}
