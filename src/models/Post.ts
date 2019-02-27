import * as yup from "yup";

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export const postSchema = yup.object<Post>().shape({
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
    body: yup.string().required()
});
