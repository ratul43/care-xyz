import Banner from "@/components/home/Banner";
import Navbar from "@/components/home/Navbar";
import ServicesOverview from "@/components/home/ServicesOverview";
import Testimonials from "@/components/home/Testimonials";
import Image from "next/image";

export default function Home() {
  return (
    <div className="space-y-20">
      <Banner></Banner>
      <ServicesOverview></ServicesOverview>
      <Testimonials></Testimonials>
    </div>
  );
}
