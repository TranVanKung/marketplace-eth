import { Fragment } from "react";
import { Hero } from "@/components/ui";
import { CourseList } from "@/components/ui/course";
import { BaseLayout } from "@/components/ui/layout";
import { getAllCourse } from "@/content/courses/fetcher";
import { CourseCard } from "@/components/ui/course";

const Home = (props: any) => {
  const { courses } = props;

  return (
    <Fragment>
      <Hero />

      <CourseList courses={courses || []}>
        {(course: any) => <CourseCard course={course} key={course?.id} />}
      </CourseList>
    </Fragment>
  );
};

Home.Layout = BaseLayout;

export const getStaticProps = () => {
  const { data } = getAllCourse();

  return {
    props: { courses: data },
  };
};

export default Home;
