import { IsDefined, Matches } from "class-validator";

export class NewsDto {
    @IsDefined({ message: "Tittle is required" })
    tittle?: string;

    description?: string;

}
