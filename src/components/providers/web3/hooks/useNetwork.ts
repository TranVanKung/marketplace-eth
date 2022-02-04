import { useEffect } from "react";
import useSwR from "swr";

const NETWORKS: any = {
  1: "Ethereum Main Network",
  3: "Ropsten Test Network",
  4: "Rinkeby Test Network",
  5: "Goerli Test Network",
  42: "Kovan Test Network",
  56: "Binance Smart Chain",
  1337: "Ganache",
};

const NEXT_PUBLIC_TARGET_CHAIN_ID: any =
  process?.env?.NEXT_PUBLIC_TARGET_CHAIN_ID;

const targetNetwork = NETWORKS[NEXT_PUBLIC_TARGET_CHAIN_ID];

export const handler = (web3: any, provider: any) => () => {
  const { data, mutate, ...rest } = useSwR(
    () => (web3 ? "web3/network" : null),
    async () => {
      const chainId = await web3?.eth?.getChainId();
      return NETWORKS[chainId];
    }
  );

  useEffect(() => {
    provider?.on("chainChanged", (chainId: any) =>
      mutate(NETWORKS[parseInt(chainId, 16)])
    );
  }, [provider]);

  return {
    data,
    mutate,
    targetNetwork,
    isSupported: data === targetNetwork,
    ...rest,
  };
};
