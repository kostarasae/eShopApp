import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config/env";
import { userRepository } from "../repositories/user.repository";
import { RegisterUserDto, LoginUserDto, AuthResponseDto } from "../types/user.types";

export const authService = {
    async register(data: RegisterUserDto): Promise<{ message: string }> {
        const hashed = await bcrypt.hash(data.password, 10);
        const user = await userRepository.findByEmail(data.email);
        if (user) throw Object.assign(new Error('Email already in use'), { status: 409 });
        await userRepository.create({ ...data, password: hashed });
        return { message: 'User registered successfully'};
    },
    async login(data: LoginUserDto): Promise<AuthResponseDto> {
        const user = await userRepository.findByEmail(data.email);
        if (!user) throw Object.assign(new Error('Invalid credentials'), { status: 401 });
        const isMatching = await bcrypt.compare(data.password, user.password);
        if (!isMatching) throw Object.assign(new Error('Invalid credentials'), { status: 401 });
        const token = jwt.sign({ id: user._id, role: user.role }, config.jwtSecret, { expiresIn: '7d' });
        return { token };
    }
};