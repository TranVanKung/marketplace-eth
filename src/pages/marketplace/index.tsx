import { Fragment, useState } from "react";
import { CourseList } from "@/components/ui/course";
import { BaseLayout } from "@/components/ui/layout";
import { getAllCourse } from "@/content/courses/fetcher";
import { useWalletInfo } from "@/components/hooks/web3";
import { CourseCard } from "@/components/ui/course";
import { OrderModal } from "@/components/ui/order";
import { Button } from "@/components/ui";
import { MarketHeader } from "@/components/ui/marketplace";

const Marketplace = (props: any) => {
  const { courses } = props;
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { canPurchaseCourse } = useWalletInfo();

  const purchaseCourse = (order: any) => {};

  return (
    <Fragment>
      <div className="py-4">
        <MarketHeader />
      </div>

      <CourseList courses={courses || []}>
        {(course: any) => (
          <CourseCard
            course={course}
            key={course?.id}
            disabled={!canPurchaseCourse}
            Footer={() => (
              <div className="mt-4">
                <Button
                  variant="lightPurple"
                  onClick={() => setSelectedCourse(course)}
                  disabled={!canPurchaseCourse}
                >
                  Purchase
                </Button>
              </div>
            )}
          />
        )}
      </CourseList>

      {selectedCourse ? (
        <OrderModal
          onSubmit={purchaseCourse}
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      ) : null}
    </Fragment>
  );
};

Marketplace.Layout = BaseLayout;

export const getStaticProps = () => {
  const { data } = getAllCourse();

  return {
    props: { courses: data },
  };
};

export default Marketplace;
