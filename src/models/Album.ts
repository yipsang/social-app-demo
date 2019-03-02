import * as yup from "yup";

import { Photo, photoSchema } from "./Photo";

export interface Album {
    userId: number;
    id: number;
    title: string;
    preview: Photo;
}

export const albumSchema: yup.Schema<Album> = yup.object<Album>().shape({
    userId: yup
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
    preview: photoSchema.required()
});
