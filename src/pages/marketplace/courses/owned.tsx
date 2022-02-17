import { Fragment } from "react";
import { BaseLayout } from "@/components/ui/layout";
import { MarketHeader } from "@/components/ui/marketplace";
import { OwnedCourseCard } from "@/components/ui/course";
import { Button, Message } from "@/components/ui";
import { useAccount, useOwnedCourses } from "@/components/hooks/web3";
import { getAllCourse } from "@/content/courses/fetcher";

const OwnedCourse = (props: any) => {
  const { courses } = props;
  const { account } = useAccount();
  const { ownedCourses } = useOwnedCourses(courses, account?.data);

  console.log("ownedCourses", ownedCourses);

  return (
    <Fragment>
      <div className="py-4">
        <MarketHeader />
      </div>

      <section className="grid grid-cols-1">
        <OwnedCourseCard>
          <Message>My custom message</Message>

          <Button>Watch the Course</Button>
        </OwnedCourseCard>
      </section>
    </Fragment>
  );
};

export const getStaticProps = () => {
  const { data } = getAllCourse();

  return {
    props: { courses: data },
  };
};

OwnedCourse.Layout = BaseLayout;

export default OwnedCourse;
