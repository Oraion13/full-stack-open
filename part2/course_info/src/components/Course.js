const Note = ({ note, exercise, key }) => {
  return (
    <li style={{"marginBottom": "3px"}} key={key}>
      {note} {exercise}
    </li>
  );
};

const Course = ({ courses }) =>
  courses.map((course) => {
    return (
      <ul style={{ "list-style-type": "none" }}>
        <li>
          <h2 key={course.id}>{course.name}</h2>
        </li>

        <ul style={{ "list-style-type": "none", "padding-left": "0" }}>
          {course.parts.map((part) => {
            return (
              <Note key={part.id} note={part.name} exercise={part.exercises} />
            );
          })}
        </ul>

        <div style={{ "font-weight": "bold" }}>
          total of{" "}
          {course.parts.reduce((prev, curr) => (prev += curr.exercises), 0)}{" "}
          exercises
        </div>
      </ul>
    );
  });

export default Course;
