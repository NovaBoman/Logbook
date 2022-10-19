/* eslint-disable no-var */
/* eslint-disable vars-on-top */
import { MongoClient } from 'mongodb';

declare global {
  var mongoClientPromise: Promise<MongoClient>;
}

export {};
