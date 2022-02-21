import { normalizeOwnedCourse } from "@/utils/nomalize";
import { createCourseHash } from "@/utils/hash";
import useSWR from "swr";

export const handler =
  (web3?: any, contract?: any) => (course: any, account: any) => {
    const swrRes = useSWR(
      () =>
        web3 && contract && account ? `web3/ownedCourse/${account}` : null,
      async () => {
        const courseHash = createCourseHash(web3)(course.id, account);

        const ownedCourse = await contract?.methods
          ?.getCourseByHash(courseHash)
          ?.call();

        if (
          ownedCourse?.owner === "0x0000000000000000000000000000000000000000"
        ) {
          return null;
        }

        return normalizeOwnedCourse(web3)(course, ownedCourse);
      }
    );

    return swrRes;
  };
