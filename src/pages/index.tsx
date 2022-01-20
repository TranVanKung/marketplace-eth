import { Fragment } from "react";
import { Hero } from "@/components/ui";
import { CourseList } from "@/components/ui/course";
import { BaseLayout } from "@/components/ui/layout";
import { getAllCourse } from "@/content/courses/fetcher";

const Home = (props: any) => {
  const { courses } = props;

  return (
    <Fragment>
      <Hero />
      <CourseList courses={courses || []} />
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
