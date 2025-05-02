import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { RecipeDto } from "./recipe.dto";
import { errorMessages } from "../../../consts";
import { Recipe } from "../../../DAL/entities/Recipe.entity";

const create = async (req: Request, res: Response, next: NextFunction) => {
	const { country, weight, currency, price_manat, price_foreign } = req.body;

	const data = new RecipeDto();
	data.country = country;
	data.weight = weight;
	data.currency = currency;
	data.price_manat = price_manat;
	data.price_foreign = price_foreign;

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
		const newRecipe = await Recipe.create({
			country,
			weight,
			currency,
			price_manat,
			price_foreign,
		}).save();

		return next(
			res.status(201).json({
				message: "Recipe created succesfully",
				data: newRecipe,
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
		const existRecipe = await Recipe.findOne({
			where: { id },
		});

		if (!existRecipe) {
			return next(res.status(404).json({ message: errorMessages[404] }));
		}
		await Recipe.delete({ id });
		return next(
			res.status(200).json({ message: "Recipe deleted succesfully" })
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
	const { id } = req.params;
	const { country, weight, currency, price_manat, price_foreign } = req.body;
	try {
		const existRecipe = await Recipe.findOne({ where: { id } });
		if (!existRecipe) {
			return next(res.status(404).json({ message: errorMessages[404] }));
		}
		await Recipe.update(
			{ id },
			{ country, weight, currency, price_manat, price_foreign }
		);
		return next(
			res.status(200).json({ message: "Recipe updated succesfully" })
		);
	} catch (error) {
		return next(
			res.status(500).json({ message: errorMessages[500], error })
		);
	}
};
const get = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const recipes = await Recipe.find();
		return next(
			res
				.status(200)
				.json({ message: "Recipes fetched succesfully", data: recipes })
		);
	} catch (error) {
		return next(
			res.status(500).json({ message: errorMessages[500], error })
		);
	}
};

export const RecipeController = () => ({
	create,
	update,
	deletee,
	get,
});
