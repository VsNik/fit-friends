import { Expose } from "class-transformer";
import { UserRdo } from "./user.rdo";

export class UserCollectionRdo {
    @Expose()
    data: UserRdo[];
  
    @Expose()
    page: number;
  
    @Expose()
    total: number;
}