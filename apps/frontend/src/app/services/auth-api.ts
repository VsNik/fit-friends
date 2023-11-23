import { IUser } from "@fit-friends/shared";
import { fakeUser } from "../fake-data/fake-user";

const TIMEOUT = 500;

export const authApi = {
    checkAuth: (): Promise<IUser> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(fakeUser), TIMEOUT)
        });
    }
}