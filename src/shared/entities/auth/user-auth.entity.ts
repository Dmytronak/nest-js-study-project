import { Document } from 'mongoose';

export interface User extends Document {
    email: string;
    salt: string;
    hash: string;
    firstName: string;
    lastName: string;
    fullName: string;
    age: number;
}
