import { Fragment } from "react";
import { EthRates } from "@/components/ui";
import { Breadcrumbs } from "@/components/ui";
import WalletBar from "@/components/ui/web3/walletbar";
import { useAccount } from "@/components/hooks/web3";

const LINKS = [
  {
    href: "/marketplace",
    value: "Buy",
  },
  {
    href: "/marketplace/courses/owned",
    value: "My Courses",
  },
  {
    href: "/marketplace/courses/managed",
    value: "Manage Courses",
    requireAdmin: true,
  },
];

const Header = () => {
  const { account } = useAccount();

  return (
    <Fragment>
      <div className="pt-4">
        <WalletBar />
      </div>

      <EthRates />

      <div className="flex flex-row-reverse p-4 px-4 sm:px-6 lg:px-8">
        <Breadcrumbs isAdmin={account.isAdmin} items={LINKS} />
      </div>
    </Fragment>
  );
};

export default Header;
