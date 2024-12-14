import { IUser } from "./IUser.interface";

export interface IBaseModelAction {
    createdBy: IUser,
    deletedBy: IUser,
    updatedBy: IUser,
    isDeleted: boolean
}
