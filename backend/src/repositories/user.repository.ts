import { RegisterUserDto } from '../../../shared/types/user.types';
import UserModel, { UserDocument } from '../models/User';

export const userRepository = {

    findByEmail(email: string): Promise<UserDocument | null> {
        return UserModel.findOne({ email });
    },
    findById(id: string): Promise<UserDocument | null> {
        return UserModel.findById(id);
    },
    create(data: RegisterUserDto): Promise<UserDocument> {
        return UserModel.create(data) as Promise<UserDocument>;
    }
};