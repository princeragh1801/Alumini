import { IdAndName } from "./shared";
import { UserBasic } from "./user";

export interface Blog {
  id: string;
  description: string;
  tags: IdAndName[];
  imageUrls: string[];
  user: UserBasic;
  createdOn: string;
  updatedOn: string | null;
}

export interface BlogForm {
  description : string,
  imageUrls : string[],
  tags : string[]
}