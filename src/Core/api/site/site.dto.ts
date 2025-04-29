import { IsDefined, Matches } from "class-validator";

export class SiteDto {
    @IsDefined({ message: "Link is required" })
    link?: string;
}