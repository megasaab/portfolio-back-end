import mongoose, { SchemaTypes } from "mongoose"

const userSchema = new mongoose.Schema({
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    token: { type: String, },
    portfolioId: {type: mongoose.Types.ObjectId, ref: 'portfolio'}
  });
  
export const USER = mongoose.model("user", userSchema);