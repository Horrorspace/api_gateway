import { ObjectId as objectId } from 'mongoose';

export interface IUser {
    _id: objectId;
    login: string;
    email: string;
    password: string;
    phone: string | null;
    confirmationCode: string | null;
    confirmed: boolean;
    registrationDate: Date;
}