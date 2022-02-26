import { Fragment } from "react";
import { BaseLayout } from "@/components/ui/layout";
import { MarketHeader } from "@/components/ui/marketplace";
import { OwnedCourseCard } from "@/components/ui/course";
import { Button, Message } from "@/components/ui";
import { useAccount, useOwnedCourses } from "@/components/hooks/web3";
import { getAllCourse } from "@/content/courses/fetcher";
import { useRouter } from "next/router";
import Link from "next/link";
import { useWeb3 } from "@/components/providers";

const OwnedCourse = (props: any) => {
  const { courses } = props;
  const { account } = useAccount();
  const router = useRouter();
  const { requireInstall } = useWeb3();
  const { ownedCourses } = useOwnedCourses(courses, account?.data);

  return (
    <Fragment>
      <MarketHeader />
      <section className="grid grid-cols-1">
        {ownedCourses.isEmpty && (
          <div className="w-1/2">
            <Message>
              <div>You don&apos;t own any courses</div>
              <Link href="/marketplace">
                <a className="font-normal hover:underline">
                  <i>Purchase Course</i>
                </a>
              </Link>
            </Message>
          </div>
        )}

        {account.isEmpty && (
          <div className="w-1/2">
            <Message>
              <div>Please connect to Metamask</div>
            </Message>
          </div>
        )}

        {requireInstall && (
          <div className="w-1/2">
            <Message>
              <div>Please install Metamask</div>
            </Message>
          </div>
        )}

        {ownedCourses.data?.map((course: any) => (
          <OwnedCourseCard key={course.id} course={course}>
            <Button onClick={() => router.push(`/courses/${course.slug}`)}>
              Watch the course
            </Button>
          </OwnedCourseCard>
        ))}
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
