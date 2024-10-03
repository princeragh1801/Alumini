import { IdAndName } from "./shared";

export interface Blog {
    id: string;
    description: string;
    tags: {
      id: string;
      name: string;
    }[];
    imageUrls: string[];
    createdByName: string;
    userProfilePictureUrl: string;
    userProfileHeadLine: string;
    createdOn: string;
    createdBy: string;
    updatedOn?: string | null;
    updatedBy?: string | null;
  }
  