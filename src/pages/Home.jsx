import React from "react";
import Carouselstart from "../components/Carouselstart";
import AboutSection from "../components/AboutSection";
import WhyUs from "../components/WhyUs";
import Sale from "../components/Sale";
import BestSellerSection from "../components/TopCategoriesSection";
import News from "../components/News";
import CategoriesSection from "../components/CategorySection";

function Home() {
  return (
    <>
      <Carouselstart />
      <AboutSection />
      <WhyUs />
      <BestSellerSection />
      <CategoriesSection></CategoriesSection>
      <Sale />
      <News />
    </>
  );
}

export default Home;
