import { Fragment, useState } from "react";
import { CourseList } from "@/components/ui/course";
import { BaseLayout } from "@/components/ui/layout";
import { getAllCourse } from "@/content/courses/fetcher";
import WalletBar from "@/components/ui/web3/walletbar";
import { useAccount, useNetwork } from "@/components/hooks/web3";
import { CourseCard } from "@/components/ui/course";
import { Button } from "@/components/ui";
import { OrderModal } from "@/components/ui/order";
import { useEthPrice } from "@/components/hooks/useEthPrice";
import { EthRates } from "@/components/ui";

const Marketplace = (props: any) => {
  const { courses } = props;
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { account } = useAccount();
  const { network } = useNetwork();
  const { eth, perItem } = useEthPrice();

  return (
    <Fragment>
      <div className="py-4">
        <WalletBar
          address={account?.data}
          network={{
            data: network?.data,
            targetNetwork: network?.targetNetwork,
            isSupported: network?.isSupported,
            hasInitialResponse: network?.hasInitialResponse,
          }}
        />

        <EthRates eth={eth?.data} perItem={perItem} />
      </div>

      <CourseList courses={courses || []}>
        {(course: any) => (
          <CourseCard
            course={course}
            key={course?.id}
            Footer={() => (
              <div className="mt-4">
                <Button
                  variant="lightPurple"
                  onClick={() => setSelectedCourse(course)}
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
