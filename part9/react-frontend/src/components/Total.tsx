import { CoursePart } from "../types/courseType";

const Total = ({courses}: {courses: Array<CoursePart>}) => {
    // const length: number = courses.reduce((curr, prev): number => {
    //     prev += curr.exerciseCount;
    //     return prev;
    // }, 0)

    let count = 0;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const total = courses.map((course: CoursePart) => {
        count += course.exerciseCount
    })

    return(
        <>
        <hr />
        Number of Exercises: {" " + count}
        </>
    )
};

export default Total;