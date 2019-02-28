import * as yup from "yup";

interface GeoLocation {
    lat: string;
    lng: string;
}

interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: GeoLocation;
}

interface Company {
    name: string;
    catchPhase: string;
    bs: string;
}

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
}

const geoLocationSchema = yup.object<GeoLocation>().shape({
    lat: yup.string().required(),
    lng: yup.string().required()
});

const addressSchema = yup.object<Address>().shape({
    street: yup.string().required(),
    suite: yup.string().required(),
    city: yup.string().required(),
    zipcode: yup.string().required(),
    geo: geoLocationSchema.required()
});

const companySchema = yup.object<Company>().shape({
    name: yup.string().required(),
    catchPhrase: yup.string().required(),
    bs: yup.string().required()
});

export const userSchema = yup.object<User>().shape({
    id: yup
        .number()
        .integer()
        .positive()
        .required(),
    name: yup.string().required(),
    username: yup.string().required(),
    email: yup
        .string()
        .email()
        .required(),
    address: addressSchema.required(),
    phone: yup.string().required(),
    website: yup.string().required(),
    company: companySchema.required()
});
