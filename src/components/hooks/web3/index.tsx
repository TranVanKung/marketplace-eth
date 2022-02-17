import { useHooks } from "@/components/providers/web3";

const enhanceHook = (swrRes: any) => {
  return {
    ...swrRes,
    hasInitialResponse: swrRes?.data || swrRes?.error,
  };
};

export const useNetwork = () => {
  const swrRes = enhanceHook(useHooks((hooks: any) => hooks?.useNetwork()));

  return {
    network: swrRes,
  };
};

export const useAccount = () => {
  const swrRes = enhanceHook(useHooks((hooks: any) => hooks?.useAccount()));

  return {
    account: swrRes,
  };
};

export const useOwnedCourses = (...args: any) => {
  const swrRes = enhanceHook(
    useHooks((hooks: any) => hooks?.useOwnedCourses)(...args)
  );

  return {
    ownedCourses: swrRes,
  };
};

export const useWalletInfo = () => {
  const { account } = useAccount();
  const { network } = useNetwork();

  return {
    account,
    network,
    canPurchaseCourse: !!(account?.data && network?.isSupported),
  };
};
