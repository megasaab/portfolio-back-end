import mongoose, { SchemaTypes } from "mongoose"

const userSchema = new mongoose.Schema({
    title: { type: String, default: null },
    position: { type: String, default: null },
    aboutMe: { type: String, default: null},
    skills: {type: Object, default: [] }
  });
  
export const PORTFOLIO = mongoose.model("portfolio", userSchema)