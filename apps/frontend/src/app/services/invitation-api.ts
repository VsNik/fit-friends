import { AxiosResponse } from 'axios';
import api from './api';
import { IInvitation, InviteStatus } from '@fit-friends/shared';
import { generatePath } from 'react-router-dom';
import { ApiInvite } from '../constants/route';

export const invitationApi = {
  createInvite: (id: string): Promise<AxiosResponse<IInvitation>> => {
    return api.post<IInvitation>(generatePath(ApiInvite.Invite, {id}));
  },

  fetchFromInvites: (): Promise<AxiosResponse<IInvitation[]>> => {
    return api.get<IInvitation[]>(generatePath(ApiInvite.Invites));
  },

  changeInviteStatus: (inviteId: string, status: InviteStatus): Promise<AxiosResponse<IInvitation>> => {
    return api.patch<IInvitation>(generatePath(ApiInvite.Invite, {id: inviteId}), { status });
  },
};
