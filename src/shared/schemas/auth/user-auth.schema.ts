import * as mongoose from 'mongoose';

export const UserScheme = new mongoose.Schema({
    creationAt: { type: Date, default: new Date()},
    email: { type: String, unique: true, required: true },
    salt: {type: String, required:true},
    hash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    fullName: String,
    age: Number
});