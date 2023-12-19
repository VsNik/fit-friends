import { IOrder } from "./order.interface";

export interface IOrderCollection {
    data: IOrder[];
    page: number;
    total: number;
  }