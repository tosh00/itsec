import mongoose, {Document, Schema} from "mongoose";

export interface IUserData {
    username: string,
    password: string,
    timestamp?: Date
}

export interface IUserDataModel extends IUserData, Document {};

const UserDataSchema: Schema = new Schema(
    {
        username: {type: String, required: true},
        password: {type: String, required: true},
        timestamp: {type: Date, required: false}
    },
    {
        versionKey: false
    }
)

export default mongoose.model<IUserDataModel>('UserData', UserDataSchema);