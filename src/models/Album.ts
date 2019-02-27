import * as yup from "yup";

export interface Album {
    userId: number;
    id: number;
    title: string;
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
    title: yup.string().required()
});
