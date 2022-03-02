interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

interface HoursTarget {
    hours: Array<number>,
    target: number
}

const parseArgumentEx = (args: Array<string>): HoursTarget => {
    if (args.length < 4) throw new Error("Not enough arguments");
    if (isNaN(Number(args[2]))) throw new Error(`target value: '${args[2]}' is NaN`);

    const hours: Array<number> = args.reduce((prev, current, index) => {
        if (index > 2) {
            if (isNaN(Number(current)))
                throw new Error(`Illegal argument '${current}'`);
            return prev.concat(Number(current));
        }
        return [];
    }, []);

    return {
        hours: hours,
        target: Number(args[2])
    }
}

const calulateExercise = (hours: Array<number>, target: number): Result => {
    const calculate: { trainingDays: number, average: number } = hours.reduce((prev, current) => {
        const trainingDays = current != 0 ? prev.trainingDays + 1 : prev.trainingDays
        const average = ((current) / hours.length) + prev.average;

        return {
            trainingDays,
            average
        }
    }, {
        trainingDays: 0,
        average: 0,
    })

    return {
        periodLength: hours.length,
        trainingDays: calculate.trainingDays,
        success: calculate.average >= target,
        rating: calculate.average < target / 2 ? 1 : calculate.average < target ? 2 : 3,
        ratingDescription: calculate.average < target ? "Work hard to attain the goal" : calculate.average > target ? "Outstanding energy" : "Good job",
        target,
        average: calculate.average
    }
}

try {
    const { hours, target } = parseArgumentEx(process.argv)
    console.log(calulateExercise(hours, target));

} catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
        errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
}