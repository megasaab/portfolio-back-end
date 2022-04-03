import mongoose, { SchemaTypes } from "mongoose"

const projectSchema = new mongoose.Schema({
    title: { type: String, default: null },
    author: { type: String, default: null },
    projectLogo: { type: String, default: null },
    createdDate: { type: String, default: null },
    language: { type: String, default: null },
    about: { type: String, default: null },
    link: { type: String, default: null },
    githabLink: { type: String, default: null },
    description: {type: String, default: null},
});

export const PROJECT = mongoose.model("project", projectSchema);