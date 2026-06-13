import { UserDocument } from "../models/User"

export const toUserResponse = (doc: UserDocument) => {
    return {
        id: doc._id.toString(),
        name: doc.name,
        email: doc.email,
        role: doc.role,
        createdAt: doc.createdAt
    };
};