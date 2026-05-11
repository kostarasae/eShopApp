export enum UserRole {
    ADMIN = 'admin',
    USER = 'customer'
}

export interface IUser {
    _id?: string,
    name: string,
    email: string,
    password: string,
    role: UserRole,
    createdAt?: Date
}

export interface RegisterUserDTO {
    name: string,
    email: string,
    password: string,
    role?: UserRole
}

export interface LoginUserDTO {
    email: string,
    password: string
}

export interface AuthResponseDTO {
    token: string,
    user: IUser
}

export interface JwtPayload {
    id: string,
    role: UserRole
}