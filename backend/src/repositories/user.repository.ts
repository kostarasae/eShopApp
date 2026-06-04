import { RegisterUserDto } from '../types/user.types';
import UserModel, { UserDocument } from '../models/User';

export const userRepository = {

    findByEmail(email: string): Promise<UserDocument | null> {
        return UserModel.findOne({ email });
    },
    create(data: RegisterUserDto): Promise<UserDocument> {
        return UserModel.create(data) as Promise<UserDocument>;
    }
};