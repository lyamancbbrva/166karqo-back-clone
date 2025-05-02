import { NextFunction, Request, Response } from "express";
import { NewsDto } from "./news.dto";
import { validate } from "class-validator";
import { errorMessages } from "../../../consts";
import { News } from "../../../DAL/entities/News.entity";

const create = async (req: Request, res: Response, next: NextFunction) => {
	const { tittle, description } = req.body;
	const img = req.file;

	const data = new NewsDto();
	data.description = description;
	data.tittle = tittle;

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
		const newNews = await News.create({
			tittle,
			description,
			img_url: img.filename,
		}).save();

		return next(
			res.status(201).json({
				message: "News created succesfully",
				data: newNews,
			})
		);
	} catch (error) {
		console.log(error)
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
		const existNews = await News.findOne({ where: { id } });

		if (!existNews) {
			return next(
				res.status(404).json({
					message: errorMessages[404],
				})
			);
		}
		await News.delete(id);
		return next(
			res.json({
				message: "News deleted succesfully",
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
	const { tittle, description } = req.body;
	console.log(tittle)
	const { id } = req.params;
	const img = req.file;

	try {
		const existNews = await News.findOne({ where: { id } });

		if (!existNews) {
			return next(
				res.status(404).json({
					message: errorMessages[404],
				})
			);
		}
		await News.update(id, { tittle, description, img_url: img?.filename });
		return next(
			res.json({
				message: "News updated succesfully",
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
		const news = await News.find();

		return next(
			res.json({
				data: news,
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
export const NewsController = () => ({
	create,
	deletee,
	get,
	update,
});
