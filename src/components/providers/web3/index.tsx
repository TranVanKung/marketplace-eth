import { createContext, useContext, useEffect, useMemo, useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import { setupHooks } from "./hooks/setupHooks";

const Web3Context = createContext(null);

export const Web3Provider = (props: any) => {
  const { children } = props;

  const [web3Api, setWeb3Api] = useState<any>({
    provider: null,
    web3: null,
    contract: null,
    isLoading: true,
    hooks: setupHooks(),
  });

  useEffect(() => {
    const loadProvider = async () => {
      const provider: any = await detectEthereumProvider();

      if (provider) {
        const web3: any = new Web3(provider);

        setWeb3Api({
          provider,
          web3,
          contract: null,
          isLoading: false,
          hooks: setupHooks(web3, provider),
        });
      } else {
        setWeb3Api((api: any) => ({ ...api, isLoading: false }));
        console.log("Please install metamask");
      }
    };

    loadProvider();
  }, []);

  const _web3Api = useMemo(() => {
    const { web3, provider, isLoading } = web3Api;

    return {
      ...web3Api,
      requireInstall: !isLoading && !web3,
      connect: provider
        ? async () => {
            try {
              await provider?.request({
                method: "eth_requestAccounts",
              });
            } catch {
              window.location.reload();
            }
          }
        : () =>
            console.log(
              "Cannot connect to Metamask, try to reload your browser please"
            ),
    };
  }, [web3Api]);

  return (
    <Web3Context.Provider value={_web3Api}>{children}</Web3Context.Provider>
  );
};

export const useWeb3: any = () => useContext(Web3Context);

export const useHooks = (cb: any) => {
  const { hooks } = useWeb3();

  return cb(hooks);
};
