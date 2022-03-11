export enum Gender{
    Male = "male",
    Female = "female",
    Others = "others"
}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string
}

export type NonSensitivePatientDetails = Omit<Patient, "ssn">;

export type NewPatientEntry = Omit<Patient, "id">;