import { IInvitation, InviteStatus } from "@fit-friends/shared";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { invitationApi } from "../../services/invitation-api";

export const createInvitationAction = createAsyncThunk<IInvitation, string>(
    'invitations/create',
    async (id) => {
        const {data} = await invitationApi.createInvite(id);
        return data;
    }
)

export const fetchFromInvitesAction = createAsyncThunk<IInvitation[]>(
    'invitations/fetch-from',
    async () => {
        const {data} = await invitationApi.fetchFromInvites();
        return data;
    }
);

export const changeInviteStatusAction = createAsyncThunk<IInvitation, {invitationId: string, status: InviteStatus}>(
    'invitations/change-status',
    async ({invitationId, status}) => {
        const {data} = await invitationApi.changeInviteStatus(invitationId, status);
        return data;
    }
)