import { NextFunction, Response } from "express"
import { AuthRequest } from "../../../types"
import { OrderDto } from "./order.dto"
import { validate } from "class-validator"
import { errorMessages } from "../../../consts"
import { Order } from "../../../DAL/entities/Order.entity"
import { Packagee } from "../../../DAL/entities/Package.entity"

const create = async (req: AuthRequest, res:Response, next:NextFunction) => {
    const {region, time, address, phone, package_id} = req.body

    const data = new OrderDto()
    data.addess = address
    data.phone = phone
    data.region = region
    data.time = time

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
        const existPackage = await Packagee.find({where: {id: package_id}})

        if (!existPackage) {
            return next(res.status(404).json({
                message: errorMessages[404]
            }))
        }

        const newOrder = await Order.create({
            address, region, time, phone, packages: package_id
        }).save()

        return next(res.status(201).json({
            message: "Order created succesfully",
            data: newOrder
        }))
        
    } catch (error) {
        return next(res.status(500).json({
            message: errorMessages[500],
            error
        }))
    }
    
}
const get = async (req: AuthRequest, res:Response, next:NextFunction) => {

}
export const OrderController = () => ({
    create, get
})