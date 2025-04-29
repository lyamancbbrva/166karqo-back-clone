import { NextFunction, Request, Response } from "express"

const create = async (req:Request, res:Response, next:NextFunction) => {}
const deletee = async (req:Request, res:Response, next:NextFunction) => {}
const update = async (req:Request, res:Response, next:NextFunction) => {}
const get = async (req:Request, res:Response, next:NextFunction) => {}

export const RecipeController = () => ({
    create, update, deletee, get
})