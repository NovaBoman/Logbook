/* eslint-disable no-multi-assign */
import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}
const uri = process.env.MONGODB_URI;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri)
      .then((mongoosePromise) => mongoosePromise);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
