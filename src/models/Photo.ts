import * as yup from "yup";

export interface Photo {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

export const photoSchema: yup.Schema<Photo> = yup.object<Photo>().shape({
    albumId: yup
        .number()
        .integer()
        .positive()
        .required(),
    id: yup
        .number()
        .integer()
        .positive()
        .required(),
    title: yup.string().required(),
    url: yup
        .string()
        .url()
        .required(),
    thumbnailUrl: yup
        .string()
        .url()
        .required()
});
