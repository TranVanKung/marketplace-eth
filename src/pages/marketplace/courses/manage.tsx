import { Fragment } from "react";
import { BaseLayout } from "@/components/ui/layout";
import { MarketHeader } from "@/components/ui/marketplace";
import { OwnedCourseCard, CourseFilter } from "@/components/ui/course";
import { Button } from "@/components/ui";

const ManageCourse = () => {
  return (
    <Fragment>
      <div className="py-4">
        <MarketHeader />
        <CourseFilter />
      </div>

      <section className="grid grid-cols-1">
        <OwnedCourseCard>
          <div className="flex mr-2 relative rounded-md">
            <input
              type="text"
              name="account"
              id="account"
              className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
              placeholder="0x2341ab..."
            />
            <Button>Verify</Button>
          </div>
        </OwnedCourseCard>
      </section>
    </Fragment>
  );
};

ManageCourse.Layout = BaseLayout;

export default ManageCourse;
