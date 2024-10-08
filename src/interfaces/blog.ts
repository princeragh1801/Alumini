import { IdAndName } from "./shared";
import { UserBasic } from "./user";

export interface Blog {
  id: string;
  description: string;
  tags: IdAndName[];
  mediaUrls: string[];
  user: UserBasic;
  createdOn: string;
  updatedOn: string | null;
}

export interface BlogForm {
  description : string,
  imageUrls : string[],
  tags : string[]
}

export interface BlogPost {
  description : string,
  MediaFiles : any[],
  tags : string[]
}