import { Request } from "express";
import { User } from "../DAL/entities/User.entity";

export interface Iuser extends User {
    id: string;
}
export interface AuthRequest extends Request {
    user?: Iuser
}