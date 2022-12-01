/* eslint-disable object-curly-newline */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
import { models, model, Schema, ObjectId } from 'mongoose';

export interface ILog {
  _id?: ObjectId;
  user: string;
  date: Date;
  type: string;
  freefall: number;
  altitude: number;
  groupCount: number;
  location?: string;
  aircraft?: string;
  canopy?: string;
  comment?: string;
  tags?: string[];
}

export interface ILogFields {
  user: string;
  date: Date;
  type?: string;
  freefall?: number;
  altitude: number;
  groupCount?: number;
  location?: string;
  aircraft?: string;
  canopy?: string;
  comment?: string;
  tags?: string[];
}

const LogSchema = new Schema<ILog>({
  user: { type: String, required: true },
  date: { type: Date, required: [true, 'Date is required'] },
  type: { type: String },
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
 *  - An average speed of 200km/h or ~55m/s
 *  - A deployment altitude of 1000m
 */

LogSchema.pre(['save'], async function (next) {
  const freefall = this.get('freefall');

  // "freefall" property has a value of 0 if no value is provi
  if (freefall === 0) {
    const altitude = this.get('altitude');
    const calculatedFreefallTime = Math.round((altitude - 1000) / 55);
    this.set('freefall', calculatedFreefallTime);
  }
  return next();
});

LogSchema.pre('findOneAndUpdate', async function (next) {
  const freefall = this.get('freefall');
  if (freefall === 0) {
    const altitude = this.get('altitude');
    const calculatedFreefallTime = Math.round((altitude - 1000) / 55);
    this.set('freefall', calculatedFreefallTime);
  }
  return next();
});

const LogModel = models.Log || model('Log', LogSchema);

export default LogModel;
