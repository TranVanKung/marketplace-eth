import { Fragment } from "react";
import { Footer, Navbar } from "@/components";

const BaseLayout = (props: any) => {
  const { children } = props;

  return (
    <Fragment>
      <div className="relative max-w-7xl mx-auto px-4">
        <Navbar />
        <div className="fit">{children}</div>
      </div>

      <Footer />
    </Fragment>
  );
};

export default BaseLayout;
