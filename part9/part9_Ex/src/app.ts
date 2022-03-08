import express, { Request, Response } from "express";
import parseArgsForServer from "./bmiCalculator";
import parseArgsForServerEx from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
    res.send("Hello fishy!!");
});

app.get("/bmi", ({ query }: Request, res: Response) => {
    const height: string = query.height ? query.height.toString() : "";
    const weight: string = query.weight ? query.weight.toString() : "";

    try {
        res.send({
            height: height,
            weight: weight,
            bmi: parseArgsForServer(height, weight),
        });
    } catch (error) {
        res.send({
            error: `${error}`,
        });
    }
});

app.post("/exercise", ({ body }: Request, res: Response) => {
    if (!body)
        console.log("Input some data");

    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const result = parseArgsForServerEx(body);
        return res.status(200).send(result);
    } catch (error) {
        return res.status(400).send({
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            error
        });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`server listening to port ${PORT}`);
});
