import Analytics from "./Analytics";
import CheckIntervals from "./CheckIntervals";
import CTASection from "./CTASection";
import Hero from "./Hero";
import UptimeMonitoring from "./UptimeMonitoring";

export default function HomePage() {
  return (
    <main className="w-full relative">
      <Hero />
      <UptimeMonitoring />
      <CheckIntervals />
      <Analytics />
      <CTASection />
    </main>
  );
}
