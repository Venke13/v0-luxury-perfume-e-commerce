import { HeroSection } from "@/components/home/HeroSection"
import { ProductCarousel } from "@/components/home/ProductCarousel"
import { MoodNavigation } from "@/components/home/MoodNavigation"
import { FeaturedCollections } from "@/components/home/FeaturedCollections"
import { NewsletterSection } from "@/components/home/NewsletterSection"

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <MoodNavigation />
      <ProductCarousel />
      <FeaturedCollections />
      <NewsletterSection />
    </div>
  )
}
