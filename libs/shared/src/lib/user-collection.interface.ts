import { IUser } from "./user.interface";

export interface IUserCollection {
    data: IUser[];
    page: number;
    total: number;
}