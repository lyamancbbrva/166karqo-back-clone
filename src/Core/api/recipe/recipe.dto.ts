import { IsDefined, IsIn } from "class-validator";

export class RecipeDto{

        @IsIn(['USA', 'England', 'Turkey'], { message: "Currency must be one of USA, England, Turkey" })
        @IsDefined({message: "Country is required"})
        country?: string;
    
        @IsDefined({message: "Weight is required"})
        weight?: string;
    
        @IsIn(['USD', 'EUR', 'TRY'], { message: "Currency must be one of USD, EUR, TRY" })
        @IsDefined({message: "Currency is required"})
        currency?: string;
    
        @IsDefined({message: "Price is required"})
        price_manat?: string;
    
        @IsDefined({message: "Price is required"})
        price_foreign?: string;
}