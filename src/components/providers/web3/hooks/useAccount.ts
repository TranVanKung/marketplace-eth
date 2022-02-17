import { useEffect } from "react";
import useSWR from "swr";

const adminAddress: any = {
  "0x94d5848d7ef6981ff3c0acda7f10e005087a0df08fb20462e1a552ea3a93f0be": true,
};

export const handler = (web3?: any, provider?: any) => () => {
  const { data, mutate, ...rest } = useSWR(
    () => (web3 ? "web3/accounts" : null),
    async () => {
      const accounts = await web3?.eth?.getAccounts();

      return accounts[0];
    }
  );

  useEffect(() => {
    provider?.on("accountsChanged", (accounts: any[]) =>
      mutate(accounts[0] ?? null)
    );
  }, [provider]);

  return {
    data,
    isAdmin: (data && adminAddress[web3?.utils?.keccak256(data)]) ?? false,
    mutate,
    ...rest,
  };
};
