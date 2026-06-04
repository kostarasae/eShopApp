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

export interface RegisterUserDto {
    name: string,
    email: string,
    password: string,
    role?: UserRole
}

export interface LoginUserDto {
    email: string,
    password: string
}

export interface AuthResponseDto {
    token: string
}

export interface JwtPayload {
    id: string,
    role: UserRole
}