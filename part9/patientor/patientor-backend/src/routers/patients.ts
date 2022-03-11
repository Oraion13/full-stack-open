import express, { Request, Response } from "express";
import { v1 as uuid } from "uuid";

import patients from "../../data/patients";
import { NewPatientEntry, NonSensitivePatientDetails, Patient } from "../types/PatientType";
import { toNewPatientEntry } from "../utils/utils";

const patientsRouter = express.Router();

// Get all patients
patientsRouter.get("/", (_req: Request, res: Response) => {
    const gotPatients: NonSensitivePatientDetails[] = patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
        return { id, name, dateOfBirth, gender, occupation };
    });

    if (!gotPatients) {
        return res.status(204).send({ message: "No patients report" });
    }

    return res.status(200).send(gotPatients);
});


// Post a new patient
patientsRouter.post("/", (req: Request, res: Response) => {
    try {
        const body: NewPatientEntry = toNewPatientEntry(req.body);
        const id: string = uuid();
        const newEntry: Patient = {
            id,
            ...body
        };

        if (!newEntry) {
            return res.status(400).send({ error: "new patient cannot be created" });
        }

        patients.push(newEntry);
        return res.status(200).send(newEntry);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }

    return res.status(400).send("Something went wrong");
});

export default patientsRouter;