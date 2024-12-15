import Hero from "./_components/Hero";
import CategoryListContainer from "./_components/CategoryListContainer";
import Testimonials  from "./_components/Testimonials";
import Summarization from "./_components/Summarization";
import FAQ from "./_components/FAQ";
import StatsSection from "./_components/StatsSection";

export default function Page() {
  return (
    <>
      <Hero />
      <CategoryListContainer />
      <StatsSection />
      <Summarization />
      <Testimonials />
      <FAQ />
    </>
  )
}
