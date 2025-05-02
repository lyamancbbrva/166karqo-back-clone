import { NextFunction, Request, Response } from "express"
import { SiteDto } from "./site.dto";
import { validate } from "class-validator";
import { errorMessages } from "../../../consts";
import { Site } from "../../../DAL/entities/Site.entity";

const create = async (req: Request, res: Response, next: NextFunction) => {
    const { link } = req.body;
    const img = req.file;

    const data = new SiteDto();
    data.link = link

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
    if (!img) {
        return next(
            res.status(422).json({
                message: errorMessages[422],
            })
        );
    }
    try {
        const newSite = await Site.create({
            link,
            img_url: img.filename,
        }).save();

        return next(
            res.status(201).json({
                message: "Site created succesfully",
                data: newSite,
            })
        );
    } catch (error) {
        return next(
            res.status(500).json({
                message: errorMessages[500],
                error,
            })
        );
    }
};
const deletee = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const existSite = await Site.findOne({ where: { id } });

        if (!existSite) {
            return next(
                res.status(404).json({
                    message: errorMessages[404],
                })
            );
        }
        await Site.delete(id);
        return next(
            res.json({
                message: "Site deleted succesfully",
            })
        );
    } catch (error) {
        return next(
            res.status(500).json({
                message: errorMessages[500],
                error,
            })
        );
    }
};
const update = async (req: Request, res: Response, next: NextFunction) => {
    const { link } = req.body;
    const { id } = req.params;
    const img = req.file;

    try {
        const existNews = await Site.findOne({ where: { id } });

        if (!existNews) {
            return next(
                res.status(404).json({
                    message: errorMessages[404],
                })
            );
        }
        await Site.update(id, { link, img_url: img?.filename });
        return next(
            res.json({
                message: "Sites updated succesfully",
            })
        );
    } catch (error) {
        return next(
            res.status(500).json({
                message: errorMessages[500],
                error,
            })
        );
    }
};
const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sites = await Site.find();

        return next(
            res.json({
                data: sites,
            })
        );
    } catch (error) {
        return next(
            res.status(500).json({
                message: errorMessages[500],
                error,
            })
        );
    }
};
export const SiteController = () => ({
    create, deletee, get, update
})