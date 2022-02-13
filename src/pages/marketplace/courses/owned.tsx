import { Fragment } from "react";
import { BaseLayout } from "@/components/ui/layout";
import { MarketHeader } from "@/components/ui/marketplace";
import { OwnedCourseCard } from "@/components/ui/course";
import { Button, Message } from "@/components/ui";

const OwnedCourse = () => {
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

OwnedCourse.Layout = BaseLayout;

export default OwnedCourse;
