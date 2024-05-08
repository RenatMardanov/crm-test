import { AxiosResponse } from "axios";
import { $api } from "../http";
import { IUser } from "../../types/types";

export class UserService {
    static async getUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>("/users");
    }
}
