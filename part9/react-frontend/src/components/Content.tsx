import { CoursePart } from "../types/courseType";

const Content = ({ courses }: { courses: Array<CoursePart> }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const result = (course: CoursePart) => {
    switch (course.type) {
      case "normal":
        return <i>{course.description}</i>;
      case "groupProject":
        return <p>Project Exercises: {" " + course.groupProjectCount}</p>;
      case "submission":
        return (
          <>
            <i>{course.description}</i>
            <p>{course.exerciseSubmissionLink}</p>
          </>
        );
      case "special":
        return (
          <>
            <i>{course.description}</i>
            <p>required skills: {" " + course.requirements.toString()}</p>
          </>
        );
      default:
        assertNever(course);
    }
  };

  console.log(courses);

  return (
    <div>
      {courses &&
        courses.map((course: CoursePart, index) => {
          return (
            <div key={index}>
              <h3>
                {course.name} {course.exerciseCount}
              </h3>
              {result(course)}
            </div>
          );
        })}
    </div>
  );
};

export default Content;
