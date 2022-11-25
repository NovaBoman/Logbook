/* eslint-disable object-curly-newline */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
import { ObjectId } from 'mongodb';
import { models, model, Schema, Date } from 'mongoose';

export interface ILog {
  _id?: ObjectId;
  userId: ObjectId;
  date: Date;
  freefall: number | 'auto';
  altitude: number;
  location?: string;
  type?: string;
  aircraft?: string;
  canopy?: string;
  accuracyLanding?: number;
  comment?: string;
  malfunction?: boolean;
  cutaway?: boolean;
}

const LogSchema = new Schema<ILog>({
  userId: { type: ObjectId, required: true },
  date: { type: Date, required: [true, 'Date is required'] },
  freefall: { type: Number, required: [true, 'Freefall time is required'] },
  altitude: { type: Number, required: [true, 'Altitude is required'] },
  location: { type: String },
  type: { type: String },
  aircraft: { type: String },
  canopy: { type: String },
  accuracyLanding: { type: Number },
  comment: { type: String },
  malfunction: { type: Boolean },
  cutaway: { type: Boolean },
});

LogSchema.pre(['save'], async function (next) {
  const freefall = this.get('freefall');
  if (freefall === 'auto') {
    const altitude = this.get('altitude');
    const calculatedFreefallTime = Math.fround(altitude / 200);
    this.set('freefall', calculatedFreefallTime);
  }
  return next();
});

LogSchema.pre('findOneAndUpdate', async function (next) {
  return next();
});

const LogModel = models.Log || model('Log', LogSchema);

export default LogModel;
