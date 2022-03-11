import { Gender } from "../types/PatientType";

const isString = (str: unknown): str is string => {
    return typeof str === "string" || str instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(gender);
};

export const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error(`missing/incorrect name ${name}`);
    }

    return name;
};

export const parseDateOfBirth = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`missing/incorrect date ${date}`);
    }

    return date;
};

export const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error(`missing/incorrect ssn ${ssn}`);
    }

    return ssn;
};

export const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error(`missing/incorrect occupation ${occupation}`);
    }

    return occupation;
};

export const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error(`missing/incorrect gender ${gender}`);
    }

    return gender;
};
