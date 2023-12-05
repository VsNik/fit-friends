import { IInvitation } from "@fit-friends/shared";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { invitationApi } from "../../services/invitation-api";

export const createInvitationAction = createAsyncThunk<IInvitation, string>(
    'invite/create',
    async (id) => {
        const {data} = await invitationApi.createInvite(id);
        return data;
    }
)