interface HeightWeight {
    height: number;
    weight: number;
}

const parseArgumentBmi = (args: Array<string>): HeightWeight => {
    if (args.length > 4) throw new Error("Too many arguments");
    if (args.length < 4) throw new Error("Not enough arguments");

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3]),
        };
    }
    throw new Error("Height/Weight is not a number");
};

const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / ((height << 1) / 100);

    return bmi < 16.0
        ? "Underweight (Severe thinness)"
        : bmi >= 16.0 && bmi < 17.0
            ? "Underweight (Moderate thinness)"
            : bmi >= 17.0 && bmi < 18.5
                ? "Underweight (Mild thinness)"
                : bmi >= 18.5 && bmi < 25.0
                    ? "Normal (healthy weight)"
                    : bmi >= 25.0 && bmi < 30.0
                        ? "Overweight (Pre-obese)"
                        : bmi >= 30.0 && bmi < 34.9
                            ? "Obese (Class I)"
                            : bmi >= 35.0 && bmi < 40.0
                                ? "Obese (Class II)"
                                : "Obese (Class III)";
};

try {
    const { height, weight } = parseArgumentBmi(process.argv);
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
        errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
}
