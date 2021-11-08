import mongoose from "mongoose";
const { Schema } = mongoose;
// const passportLocalMongoose = require('passport-local-mongoose')
const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Valid Email required"],
    unique: true,
  },
});

// userSchema.plugin(passportLocalMongoose);

export default mongoose.models.User || mongoose.model("User", userSchema);

