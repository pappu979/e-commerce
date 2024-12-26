import React from "react";
import Carouselstart from "../components/Carouselstart";
import AboutSection from "../components/AboutSection";
import WhyUs from "../components/WhyUs";
import Sale from "../components/Sale";
import TopCategoriesSection from "../components/TopCategoriesSection";
import News from "../components/News";
import HomeCategoriesSection from "../components/HomeCategorySection";

function Home() {
  return (
    <>
      <Carouselstart />
      <AboutSection />
      <WhyUs />
      <TopCategoriesSection />
      <HomeCategoriesSection></HomeCategoriesSection>
      <Sale />
      <News />
    </>
  );
}

export default Home;
