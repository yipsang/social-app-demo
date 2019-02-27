import * as yup from "yup";

export interface Comment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

export const commentSchema: yup.Schema<Comment> = yup.object<Comment>().shape({
    postId: yup
        .number()
        .integer()
        .positive()
        .required(),
    id: yup
        .number()
        .integer()
        .positive()
        .required(),
    name: yup.string().required(),
    email: yup
        .string()
        .email()
        .required(),
    body: yup.string().required()
});
