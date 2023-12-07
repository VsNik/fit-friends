import { createAsyncThunk } from "@reduxjs/toolkit";
import { IBalanceCollection } from "@fit-friends/shared";
import { balanceApi } from "../../services/balance-api";

export const fetchPurchasesAction = createAsyncThunk<IBalanceCollection>(
    'orders/purchases', 
    async () => {
      const {data} = await balanceApi.fetchPurchases();
      return data;
  });