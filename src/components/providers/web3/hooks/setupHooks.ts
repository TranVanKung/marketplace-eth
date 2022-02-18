/* eslint-disable react-hooks/rules-of-hooks */
import { handler as createAccountHook } from "./useAccount";
import { handler as createNetworkHook } from "./useNetwork";
import { handler as createOwnedCoursesHook } from "./useOwnedCourses";
import { handler as createOwnedCourseHook } from "./useOwnedCourse";
import { handler as createManagedCoursesHook } from "./useManagedCourses";

interface SetupHooksProps {
  web3?: any;
  provider?: any;
  contract?: any;
}

export const setupHooks = (args: SetupHooksProps) => {
  const { web3, provider, contract } = args;

  return {
    useAccount: createAccountHook(web3, provider),
    useNetwork: createNetworkHook(web3, provider),
    useOwnedCourses: createOwnedCoursesHook(web3, contract),
    useOwnedCourse: createOwnedCourseHook(web3, contract),
    useManagedCourses: createManagedCoursesHook(web3, contract),
  };
};
