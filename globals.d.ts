/* eslint-disable no-var */
/* eslint-disable vars-on-top */
import { MongoClient } from 'mongodb';
import { Mongoose } from 'mongoose';

declare global {
  var mongoClientPromise: Promise<MongoClient>;
}

declare global {
  var mongoose: {
    promise: Promise<Mongoose> | null;
    conn: Mongoose | null;
  };
}

export {};
