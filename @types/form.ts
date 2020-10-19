export type FormRule = (v: any) => true | string

export interface ArticleEditFormData {
  title: string;
  body: string;
  publishStatus: ArticlePublishStatus;
  postedAt: Date;
}

export enum ArticlePublishStatus {
  Publish,
  Unpublish,
}
