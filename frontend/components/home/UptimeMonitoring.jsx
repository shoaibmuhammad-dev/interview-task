import { Activity, Globe, ShieldCheck, Zap } from "lucide-react";
import FeatureCard from "../ui/FeatureCard";
import Image from "next/image";

const UptimeMonitoring = () => {
  return (
    <section className="w-full bg-[#0F172A33]">
      <div className="w-full py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Image
              src={"/uptime-monitoring-icon.svg"}
              alt="uptime-monitoring-icon"
              width={22}
              height={23}
            />
            <h2 className="text-[30px] font-extrabold text-white">
              Uptime Monitoring
            </h2>
          </div>
          <p className="text-(--gray) text-lg max-w-2xl">
            Global edge network ensuring your services are reachable from over
            50+ locations worldwide.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            icon={"/multi-region-verification-icon.svg"}
            width={25}
            height={25}
            title="Multi-Region Verification"
            description="If a service goes down, we verify from 3+ independent regions to eliminate false positives."
          />
          <FeatureCard
            icon={`/ssl-integrity-icon.svg`}
            width={20}
            height={26}
            title="SSL/TLS Integrity"
            description="Continuous certificate chain checks. Get notified 30, 15, and 7 days before expiry."
          />
          <FeatureCard
            icon={"/custom-protocol-icon.svg"}
            title="Custom Protocols"
            width={23}
            height={23}
            description="Full support for HTTP/S, TCP, UDP, ICMP Ping, DNS, and custom SMTP/IMAP checks."
          />
        </div>
      </div>
    </section>
  );
};

export default UptimeMonitoring;
