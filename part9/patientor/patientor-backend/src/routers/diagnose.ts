import express, { Request, Response } from "express";

import { Diagnose } from "../types/diagnoseType";
import diagnoses from "../../data/diagnoses";

const diagnosesRouter = express.Router();

diagnosesRouter.get("/", (_req: Request, res: Response) => {
    const gotDiagnoses: Array<Diagnose> = diagnoses;

    if (!gotDiagnoses) {
        return res.status(204).send({ message: "No diagnoses report" });
    }

    return res.status(200).send(gotDiagnoses);
});

export default diagnosesRouter;