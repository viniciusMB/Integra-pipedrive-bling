import * as mongoose from 'mongoose';

export const DealSchema = new mongoose.Schema({
  wonDay: {
    type: String,
    nullable: false,
    unique: true,
  },

  totalValue: Number,
});
