import {
  Footer,
  Navbar,
  Hero,
  Breadcrumbs,
  Walletbar,
  EthRates,
} from "@/components";
import { CourseList } from "@/components/course";
import { OrderCard } from "@/components/order";

const Home = () => {
  return (
    <div>
      <div className="relative bg-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4">
          <Navbar />

          <div className="fit">
            <Hero />
            <Breadcrumbs />
            <Walletbar />
            <EthRates />
            <CourseList />
            <OrderCard />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Home;
