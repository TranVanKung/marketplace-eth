import { Footer, Navbar } from "@/components/ui";
import { Web3Provider } from "@/components/providers";

const BaseLayout = (props: any) => {
  const { children } = props;

  return (
    <Web3Provider>
      <div className="relative max-w-7xl mx-auto px-4">
        <Navbar />
        <div className="fit">{children}</div>
      </div>

      <Footer />
    </Web3Provider>
  );
};

export default BaseLayout;
