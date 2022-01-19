import { Fragment } from "react";
import { Hero, Breadcrumbs, Walletbar, EthRates } from "@/components";
import { CourseList } from "@/components/course";
import { OrderCard } from "@/components/order";
import { BaseLayout } from "@/components/layout";
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
