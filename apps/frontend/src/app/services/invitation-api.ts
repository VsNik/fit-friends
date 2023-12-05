import { AxiosResponse } from "axios"
import api from "./api"
import { IInvitation } from "@fit-friends/shared"

export const invitationApi = {

    createInvite: (id: string): Promise<AxiosResponse<IInvitation>> => {
        return api.post<IInvitation>(`/invitations/${id}`);
    }
}