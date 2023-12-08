import { createAsyncThunk } from "@reduxjs/toolkit";
import { IBalanceCollection } from "@fit-friends/shared";
import { balanceApi } from "../../services/balance-api";

export const fetchPurchasesAction = createAsyncThunk<IBalanceCollection, string>(
  'orders/purchases', 
  async (queryString) => {
    const {data} = await balanceApi.fetchPurchases(queryString);
    return data;
});

export const loadMorePurchasesAction = createAsyncThunk<IBalanceCollection, string>(
  'orders/more-purchases', 
  async (queryString) => {
    const {data} = await balanceApi.fetchPurchases(queryString);
    return data;
});