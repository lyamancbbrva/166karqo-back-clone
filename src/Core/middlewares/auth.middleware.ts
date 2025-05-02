import { NextFunction, Response } from "express";
import { AuthRequest } from "../../types";
import { AppConfig, errorMessages } from "../../consts";
import { User } from "../../DAL/entities/User.entity";
import jwt, { JwtPayload } from 'jsonwebtoken'

export const useAuth = async (req:AuthRequest, res:Response, next:NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return next( res.status(401).json({ message: errorMessages[401] }))
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return next(res.status(401).json({ message: errorMessages[401] }))
    }
    try {
        const jwt_secret = AppConfig.JWT_SECRET
        if (!jwt_secret) {
            return next(res.status(401).json({ message: "JWT secret is not defined" }));
        }
        const decoded = jwt.verify(token, jwt_secret) as JwtPayload
        if (!decoded) {
            return next(res.status(401).json({ message: errorMessages[401] }))
        }
        const user = await User.findOne({ where: { id: decoded.id }, select: ['address', 'birthdate', 'email', 'id', 'legal_entity', 'nationality', 'sex', 'pin', 'name', 'phone', 'serial_number', 'role', 'station'] })
        if (!user) {
            return next(res.status(401).json({ message: errorMessages[401] }))
        }
        req.user = user
        next()

    } catch (error) {
        return  next(res.status(401).json({ message: errorMessages[401] }))
    }
}
export const roleCheck = (role: string[]) => {

    return (req: AuthRequest, res:Response, next: NextFunction) => {
        const userRole = req.user?.role
        if (!userRole) {
            return next(res.json({
                message: "User role is not defined!"
            }))
        }
        if (!role.includes(userRole)) {
            return next(res.status(403).json({
                message: errorMessages[403]
            }))
        }
        next()
    }
}   