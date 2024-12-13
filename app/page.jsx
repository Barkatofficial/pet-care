import Hero from "./_components/Hero";
import CategoryListContainer from "./_components/CategoryListContainer";
import Testimonials  from "./_components/Testimonials";
import Summarization from "./_components/Summarization";
import FAQ from "./_components/FAQ";

export default function Page() {
  return (
    <>
      <Hero />
      <CategoryListContainer />
      <Testimonials />
      <FAQ />
      {/* <Summarization /> */}
    </>
  )
}
