import courses from "./index";

export const getAllCourse = () => {
  return {
    data: courses,
    courseMap: courses.reduce((a: any, c, i) => {
      a[c.id] = c;
      a[c.id].index = i;

      return a;
    }, {}),
  };
};
