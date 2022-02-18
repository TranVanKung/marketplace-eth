import { Fragment, useState } from "react";
import { CourseList } from "@/components/ui/course";
import { BaseLayout } from "@/components/ui/layout";
import { getAllCourse } from "@/content/courses/fetcher";
import { useWalletInfo } from "@/components/hooks/web3";
import { CourseCard } from "@/components/ui/course";
import { OrderModal } from "@/components/ui/order";
import { Button } from "@/components/ui";
import { MarketHeader } from "@/components/ui/marketplace";
import { useWeb3 } from "@/components/providers";

const Marketplace = (props: any) => {
  const { courses } = props;
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const { canPurchaseCourse, account } = useWalletInfo();
  const { web3, contract } = useWeb3();

  const purchaseCourse = async (order: any) => {
    const hexCourseId = web3?.utils?.utf8ToHex(selectedCourse?.id);
    const orderHash = web3?.utils?.soliditySha3(
      { type: "bytes16", value: hexCourseId },
      { type: "address", value: account?.data }
    );

    const emailHash = web3?.utils?.sha3(order?.email);

    const proof = web3?.utils?.soliditySha3(
      {
        type: "bytes32",
        value: emailHash,
      },
      {
        type: "bytes32",
        value: orderHash,
      }
    );

    const value = web3?.utils.toWei(String(order?.price));

    try {
      const result = await contract?.methods
        ?.purchaseCourse(hexCourseId, proof)
        ?.send({
          from: account?.data,
          value,
        });
    } catch (error) {
      console.log("Purchase course: Operation has failed", error);
    }
  };

  return (
    <Fragment>
      <MarketHeader />

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
