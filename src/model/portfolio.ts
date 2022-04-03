import mongoose, { SchemaTypes } from "mongoose"

const userSchema = new mongoose.Schema({
    title: { type: String, default: null },
    position: { type: String, default: null },
    aboutMe: { type: String, default: null},
    skills: {type: Object, default: [] },
    socialNetworks: {type: [Object], default: null },
    projectList: {type: [Object], default: null },
    workExpirience: {type: [Object], default: null },
    avatarUrl:  { type: String, default: null},
  });
  
export const PORTFOLIO = mongoose.model("portfolio", userSchema)