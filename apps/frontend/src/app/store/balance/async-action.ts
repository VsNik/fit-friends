import { IBalance } from "@fit-friends/shared";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { balanceApi } from "../../services/balance-api";

const DISMIN_COUNT = 1;

export const fetchBalanceAction = createAsyncThunk<IBalance, string>(
    'balance/fetch-balance',
    async (id) => {
        const {data} = await balanceApi.fetchBalance(id);
        return data;
    }
);

export const dismissionAction = createAsyncThunk<IBalance, string>(
    'balance/dismission',
    async (id) => {
        const {data} = await balanceApi.dismissionBalance(id, DISMIN_COUNT);
        return data;
    }
)