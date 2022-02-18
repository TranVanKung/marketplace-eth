import { Fragment } from "react";
import { BaseLayout } from "@/components/ui/layout";
import { MarketHeader } from "@/components/ui/marketplace";
import { ManagedCourseCard, CourseFilter } from "@/components/ui/course";
import { useManagedCourses, useAdmin } from "@/components/hooks/web3";
import { useState } from "react";
import { useWeb3 } from "@/components/providers";
import { Button, Message } from "@/components/ui";

const VerificationInput = ({ onVerify }: any) => {
  const [email, setEmail] = useState("");

  return (
    <div className="flex mr-2 relative rounded-md">
      <input
        value={email}
        onChange={({ target: { value } }) => setEmail(value)}
        type="text"
        name="account"
        id="account"
        className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
        placeholder="0x2341ab..."
      />
      <Button
        onClick={() => {
          onVerify(email);
        }}
      >
        Verify
      </Button>
    </div>
  );
};

const ManageCourse = () => {
  const [proofedOwnership, setProofedOwnership] = useState<any>({});
  const { web3 } = useWeb3();
  const { account } = useAdmin({ redirectTo: "/marketplace" });
  const { managedCourses } = useManagedCourses(account);

  const verifyCourse = (email: any, { hash, proof }: any) => {
    const emailHash = web3.utils.sha3(email);
    const proofToCheck = web3.utils.soliditySha3(
      { type: "bytes32", value: emailHash },
      { type: "bytes32", value: hash }
    );

    proofToCheck === proof
      ? setProofedOwnership({
          ...proofedOwnership,
          [hash]: true,
        })
      : setProofedOwnership({
          ...proofedOwnership,
          [hash]: false,
        });
  };

  if (!account.isAdmin) {
    return null;
  }

  return (
    <Fragment>
      <MarketHeader />
      <CourseFilter />

      <section className="grid grid-cols-1">
        {managedCourses.data?.map((course: any) => (
          <ManagedCourseCard key={course.ownedCourseId} course={course}>
            <div className="flex mr-2 relative rounded-md">
              <VerificationInput
                onVerify={(email: any) => {
                  verifyCourse(email, {
                    hash: course.hash,
                    proof: course.proof,
                  });
                }}
              />
            </div>

            {proofedOwnership[course.hash] && (
              <div className="mt-2">
                <Message>Verified!</Message>
              </div>
            )}

            {proofedOwnership[course.hash] === false && (
              <div className="mt-2">
                <Message type="danger">Wrong Proof!</Message>
              </div>
            )}
          </ManagedCourseCard>
        ))}
      </section>
    </Fragment>
  );
};

ManageCourse.Layout = BaseLayout;

export default ManageCourse;
