/* eslint-disable object-curly-newline */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
import { ObjectId } from 'mongodb';
import { models, model, Schema, Date } from 'mongoose';

export interface ILog {
  _id?: ObjectId;
  user: string;
  date: Date;
  freefall: number;
  altitude: number;
  groupCount: number;
  location?: string;
  aircraft?: string;
  canopy?: string;
  comment?: string;
  tags?: string[];
}

const LogSchema = new Schema<ILog>({
  user: { type: String, required: true },
  date: { type: Date, required: [true, 'Date is required'] },
  freefall: {
    type: Number,
    required: [true, 'Freefall time is required'],
  },
  altitude: { type: Number, required: [true, 'Altitude is required'] },
  groupCount: { type: Number },
  location: { type: String },
  aircraft: { type: String },
  canopy: { type: String },
  comment: { type: String },
  tags: { type: [String] },
});

/*
 *  If no value is provided for time in freefall an estimated value
 *  is calculated based on the following assumptions:
 *  - An average speed of 200km/h or ~3333m/m
 *  - A deployment altitude of 1000m
 */

LogSchema.pre(['save'], async function (next) {
  const freefall = this.get('freefall');

  // "freefall" property has a value of 0 if no value is provi
  if (freefall === 0) {
    const altitude = this.get('altitude');
    const calculatedFreefallTime = Math.fround((altitude - 1000) / 3333);
    this.set('freefall', calculatedFreefallTime);
  }
  return next();
});

LogSchema.pre('findOneAndUpdate', async function (next) {
  return next();
});

const LogModel = models.Log || model('Log', LogSchema);

export default LogModel;
