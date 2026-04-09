import Image from "next/image";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-block px-3 py-1 bg-[#10B77F1A] border border-[#10B77F33] rounded-full mb-6">
            <span className="text-[10px] uppercase tracking-widest font-bold text-(--primary)">
              Powerful Capabilities
            </span>
          </div>
          <h1 className="text-5xl xl:text-[60px] text-white font-bold leading-tight mb-6">
            Enterprise Grade <br />
            <span className="text-(--primary)">Monitoring Engine</span>
          </h1>
          <p className="text-sm lg:text-[20px] text-gray-400 mb-10 max-w-lg leading-normal">
            A comprehensive suite of tools built for speed, accuracy, and
            reliability. Monitor your entire infrastructure from a single,
            unified dashboard.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-(--primary) text-bg-dark px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary/90 transition-all transform">
              Start Monitoring Free
            </button>
            <button className="bg-transparent border-2 border-[#10B77F4D] px-8 py-4 text-white text-lg rounded-lg font-bold hover:bg-white/10 transition-all">
              View Demo
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-20 animate-pulse"></div>
          <div className="relative bg-card-dark border border-white/10 rounded-2xl overflow-hidden shadow-2xl group">
            <Image
              src="/hero-mockup.svg"
              alt="hero-mockup"
              width={353}
              height={301}
              className="w-full h-auto opacity-90 group-hover:scale-105 transition-transform duration-700"
            />
            {/* Mock UI Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/60 via-transparent to-transparent"></div>
            <div className="absolute top-4 left-4 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
