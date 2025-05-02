import { NextFunction, Request, Response } from "express"
import { BranchDto } from "./branch.dto"
import { validate } from "class-validator"
import { errorMessages } from "../../../consts"
import { Branch } from "../../../DAL/entities/Branch.entity"

const create = async (req:Request, res:Response, next:NextFunction) => {
    const {phone, address, work_time} = req.body

    const data = new BranchDto()
    data.address = address
    data.phone = phone
    data.work_time = work_time

        const validData = await validate(data);
        if (validData.length > 0) {
            return next(
                res.status(422).json({
                    message: errorMessages[422],
                    errors: validData.map((error) => ({
                        field: error.property,
                        message: Object.values(error.constraints || {})[0],
                    })),
                })
            );
        }
        try {
            const new_branch = await Branch.create({
                address, phone, work_time
            }).save()

            return next(res.status(201).json({
                message: "Branch created succesfully",
                data: new_branch
            }))
            
        } catch (error) {
            return next(res.status(500).json({
                message: errorMessages[500],
                error
            }))
        }
}
const deletee =  async (req:Request, res:Response, next:NextFunction) => {
    const {id} = req.params
    try {
        const existBranch = await Branch.findOne({
            where: {id}
        })
        if (!existBranch) {
            return next(res.status(404).json({
                message: errorMessages[404]
            }))
        }
        await existBranch.softRemove()
        return next(res.json({
            message: "Branch deleted succesfully"
        }))
    } catch (error) {
        return next(res.status(500).json({
            message: errorMessages[500],
            error
        }))
    }
}
const update = async (req:Request, res:Response, next:NextFunction) => {
    const {address, phone,  work_time} = req.body
    const {id} = req.params

    try {
        const existBranch = await Branch.findOne({where: {id}})

        if (!existBranch) {
            return next(res.status(404).json({
                message: errorMessages[404]
            }))
        }

        await Branch.update(id,{address, phone, work_time})

        return next(res.json({
            message: "Branch updated succesfully",
        }))
        
    } catch (error) {
        return next(res.status(500).json({
            message: errorMessages[500],
            error
        }))
    }
}
const get = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const branches = await Branch.find()

        return next(res.json({
            data: branches
        }))
        
    } catch (error) {
        return next(res.status(500).json({
            message: errorMessages[500],
            error
        }))
    }
}

export const BranchController = () => ({
    create, deletee, update, get
})