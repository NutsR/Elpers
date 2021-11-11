import mongoose from "mongoose";
import Review from "../models/review";
import User from "../models/user";
const MONGO_URI = process.env.MONGO_URI;

let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
	if (cached.conn) {
		return cached.conn;
	}
	if (!cached.promise) {
		cached.promise = await mongoose.connect(MONGO_URI);
		mongoose.set("bufferCommands", false);
	}
	cached.conn = await cached.promise;
	return cached.conn;
}
export default dbConnect;
