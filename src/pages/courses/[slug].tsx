import { Fragment } from "react";
import {
  CourseHero,
  CourseCurriculum,
  CourseKeypoints,
} from "@/components/ui/course";
import { BaseLayout } from "@/components/ui/layout";
import { getAllCourse } from "@/content/courses/fetcher";

const Course = (props: any) => {
  const { course } = props;

  return (
    <Fragment>
      <div className="py-4">
        <CourseHero
          title={course?.title}
          description={course?.description}
          image={course?.coverImage}
        />
      </div>

      <CourseKeypoints points={course?.wsl} />

      <CourseCurriculum locked={true} />
    </Fragment>
  );
};

Course.Layout = BaseLayout;

export const getStaticPaths = () => {
  const { data } = getAllCourse();

  return {
    paths: data?.map((c: any) => ({
      params: {
        slug: c?.slug,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps = (props: any) => {
  const { params } = props;
  const { data } = getAllCourse();
  const course = data?.filter((c: any) => c?.slug === params?.slug)[0];

  return {
    props: { course },
  };
};

export default Course;
