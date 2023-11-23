import { CreatedOrderType } from '../types/common';

const TIMEOUT = 500;

export const orderApi = {
  createOrder: (order: CreatedOrderType): Promise<CreatedOrderType> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(order), TIMEOUT);
    });
  },
};
