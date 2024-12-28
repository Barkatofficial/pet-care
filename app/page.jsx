"use client"
import Hero from "./_components/Hero";
import CategoryListContainer from "./_components/CategoryListContainer";
import Testimonials  from "./_components/Testimonials";
import Summarization from "./_components/Summarization";
import FAQ from "./_components/FAQ";
import StatsSection from "./_components/StatsSection";
import { useSearchParams } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Page() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const phone = "+91 6294096170"
  
  return (
    
    
    <>

    
    
      <Hero />
      <CategoryListContainer />
      {/* <StatsSection /> */}
      <Summarization />
      <Testimonials />
      <FAQ />
    </>
  )
}
