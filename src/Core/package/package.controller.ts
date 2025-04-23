import { NextFunction, Request, Response } from "express"
import { PackageDto } from "./package.dto"
import { validate } from "class-validator"
import { errorMessages } from "../../consts"
import { Package } from "../../DAL/entities/Package.entity"
import { AuthRequest } from "../../types"

const create = async (req:AuthRequest, res:Response, next:NextFunction) => {
    const {following_number, product_name, store, amount, weight, delivery} = req.body

    const data = new PackageDto()
    data.amount = amount
    data.following_number = following_number
    data.weight = weight
    data.delivery = delivery
    data.product_name = product_name
    data.store = store
    const validData = await validate(data)

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
            const existPackage = await Package.findOne({where: {following_number}})
            if (existPackage) {
                return next(res.status(409).json({
                    message: "Package already exist"
                }))
            }
            const newPackage = await Package.create({
                amount,
                product_name, 
                store, 
                following_number,
                delivery,
                weight,
                user: req.user
                }).save()

                return next(res.status(201).json({
                    message: "Package created succesfully",
                    data: newPackage
                }))
            
        } catch (error) {
            console.log(error)
            return next(res.status(500).json({
                message: errorMessages[500],
                error
            }))
        }
}
const get = async (req:AuthRequest, res:Response, next:NextFunction) => {
        try {
            const id = req.user?.id
            const packages = await Package.find({where: {user: req.user}, })
            return next(res.json({
                data: packages
            }))
            
        } catch (error) {
            return next(res.status(500).json({
                message: errorMessages[500],
                error
            }))
        }
}
const changeStatus = async (req:AuthRequest, res:Response, next:NextFunction) => {
    const {status} = req.body
    const {id} = req.params
    try {
        const packagee = await Package.findOne({where: {id}, })
        if (!packagee) {
            return next(res.status(404).json({
                message: errorMessages[404]
            }))
        }
         packagee.status = status
        const newPackage = await packagee.save()
         return next(res.json({
            message: "Package status updated succesfully",
            data: newPackage
         }))
    } catch (error) {
        return next(res.status(500).json({
            message: errorMessages[500],
            error
        }))
    }
}

export const PackageController = () => ({
    create,get,changeStatus
})