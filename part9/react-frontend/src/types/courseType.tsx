interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseDecriptionExtended extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CourseDecriptionExtended {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseDecriptionExtended {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CourseDecriptionExtended {
  type: "special"
  requirements: Array<string>;
}

export type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart;
