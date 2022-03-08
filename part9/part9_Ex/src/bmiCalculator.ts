const parseArgumentBmi = (height: string, weight: string): string => {
  if (!height || !weight) throw new Error("provide both Height and Weight");
  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    return calculateBmi(Number(height), Number(weight));
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

const parseArgsForServer = (height: string, weight: string): string => {
  try {
    return parseArgumentBmi(height, weight);
  } catch (error) {
    throw new Error(`malformatted input ${error}`);
  }
};

export default parseArgsForServer;
