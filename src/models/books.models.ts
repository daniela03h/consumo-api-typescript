export interface IBooks {
    id?:              string;
    title:           string;
    author:          string;
    description:     string;
    summary:         string;
    publicationDate?: Date | null;
    createdBy?:       string;
    updatedBy?:       null;
    deletedBy?:       null;
    createdAt?:       Date;
    updatedAt?:       Date;
    deletedAt?:       null;
    files?:           any[];
}

export interface IBooksInfo {
    message: string;
    data:    IBooks[];
}

export interface IBookInfo {
    message: string;
    data: IBooks;
}