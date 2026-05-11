import { IUser, UserRole } from '../types/user.types';
import { Document, Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

interface UserDocument extends Omit<IUser, '_id'>, Document {
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument>({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true    
    },
    role: {
        type: String,
        enum: Object.values(UserRole),
        default: UserRole.USER
    }
}, { timestamps: true });

userSchema.pre('save', async function (this: UserDocument) {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = function (candidatePassword: string) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = model<UserDocument>('User', userSchema);

export default User;