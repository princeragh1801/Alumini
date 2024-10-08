import { UserBasic } from "./user"

export interface IdAndName{
    id : string,
    name : string
}

export interface Comment{
    comment : string,
    commentId : string,
    user : UserBasic
}
