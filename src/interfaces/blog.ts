import { IdAndName } from "./shared";

export interface Blog{
    id : string,
    description : string,
    imageUrls : string[],
    tags : IdAndName[],
}