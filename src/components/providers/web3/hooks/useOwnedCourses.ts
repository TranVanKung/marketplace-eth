import useSWR from "swr";

export const handler =
  (web3?: any, contract?: any) => (courses: any, account: any) => {
    const swrRes = useSWR(
      () => (web3 && contract && account ? "web3/ownedCourses" : null),
      async () => {
        const ownedCourses = [];

        for (let i = 0; i < courses?.length; i++) {
          const course = courses[i];

          if (!course?.id) {
            continue;
          }

          const hexCourseId = web3?.utils?.utf8ToHex(course?.id);
          const courseHash = web3?.utils?.soliditySha3(
            {
              type: "bytes16",
              value: hexCourseId,
            },
            {
              type: "address",
              value: account,
            }
          );

          const ownedCourse = await contract?.methods
            ?.getCourseByHash(courseHash)
            ?.call();

          if (
            ownedCourse?.owner !== "0x0000000000000000000000000000000000000000"
          ) {
            ownedCourses.push(ownedCourse);
          }
        }

        return ownedCourses;
      }
    );

    return swrRes;
  };