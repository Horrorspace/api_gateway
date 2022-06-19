import { IUser } from './IUser';
import { IStatus } from './IStatus';

export interface IUserRes extends IStatus {
    message: IUser;
}
