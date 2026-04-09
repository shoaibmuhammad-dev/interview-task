import Image from "next/image";

const CTASection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-(--primary) rounded-[2.5rem] p-12 sm:p-20 text-center relative overflow-hidden">
        <Image
          src={"/cta-bg-image.svg"}
          alt="cta-image"
          width={225}
          height={225}
          className="absolute -top-10 -right-10 p-8 opacity-10"
        />

        <div className="relative z-10">
          <h2 className="text-4xl sm:text-[48px] text-white font-extrabold mb-6">
            Ready to secure your uptime?
          </h2>
          <p className="text-white text-lg mb-12 max-w-2xl mx-auto font-medium">
            Join over 10,000 developers who trust Uptrix to keep their services
            running 24/7/365.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button className="bg-[#10221C] text-white px-8 py-4 rounded-xl font-bold text-lg">
              Get Started for Free
            </button>
            <button className="bg-white/10 text-bg-dark px-8 py-4 rounded-xl font-bold text-lg transition-all">
              Talk to Sales
            </button>
          </div>

          <p className="text-white text-sm font-medium">
            No credit card required • 14-day free trial of Pro features
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
