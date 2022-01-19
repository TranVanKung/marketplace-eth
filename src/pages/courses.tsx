import { Fragment } from "react";
import {
  CourseList,
  CourseHero,
  CourseCurriculum,
  CourseKeypoints,
} from "@/components/course";
import { BaseLayout } from "@/components/layout";

const Course = () => {
  return (
    <Fragment>
      <div className="py-4">
        <CourseHero />
      </div>
      <CourseKeypoints />
      <CourseCurriculum />
      <CourseList />
    </Fragment>
  );
};

Course.Layout = BaseLayout;

export default Course;
