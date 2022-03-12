import { useEffect, useState } from "react";
import Content from "./components/Content";
import Header from "./components/Header";
import Total from "./components/Total";
import courseService from "./services/courses";
import { CoursePart } from "./types/courseType";

const App = () => {
  const [courses, setCourses] = useState<Array<CoursePart>>([]);

  useEffect(() => {
    const getCourse = async () => {
      const response = await courseService.getCourses();
      setCourses(response);
    };
    getCourse();
  }, []);

  return(
      <>
      <Header />
      <Content courses={courses} />
      <Total courses={courses} />
      </>
  )
};

export default App;
