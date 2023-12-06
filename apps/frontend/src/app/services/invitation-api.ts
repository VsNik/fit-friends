import { AxiosResponse } from "axios"
import api from "./api"
import { IInvitation, InviteStatus } from "@fit-friends/shared"

export const invitationApi = {

    createInvite: (id: string): Promise<AxiosResponse<IInvitation>> => {
        return api.post<IInvitation>(`/invitations/${id}`);
    },

    fetchFromInvites: (): Promise<AxiosResponse<IInvitation[]>> => {
        return api.get<IInvitation[]>('/invitations');
    },

    changeInviteStatus: (inviteId: string, status: InviteStatus): Promise<AxiosResponse<IInvitation>> => {
        return api.patch<IInvitation>(`/invitations/${inviteId}`, {status});
    }
}