import { Fragment } from "react";
import { EthRates } from "@/components/ui";
import { Breadcrumbs } from "@/components/ui";
import WalletBar from "@/components/ui/web3/walletbar";

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
    href: "/marketplace/courses/manage",
    value: "Manage Courses",
  },
];

const Header = () => {
  return (
    <Fragment>
      <WalletBar />
      <EthRates />

      <div className="flex flex-row-reverse py-4 px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={LINKS} />
      </div>
    </Fragment>
  );
};

export default Header;
