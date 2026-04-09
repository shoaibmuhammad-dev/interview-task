import Image from "next/image";

const anaylics = [
  {
    icon: `/uptime-trends-icon.svg`,
    title: "Uptime Trends",
    desc: "Calculate SLAs effortlessly with weekly/monthly uptime percentages down to 4 decimal places.",
  },
  {
    icon: `/latencies-icon.svg`,
    title: "Latencies Map",
    desc: "Visualize response times globally. Identify which geographical regions are suffering from lag.",
  },
  {
    icon: `/baseline-comparison.svg`,
    title: "Baseline Comparison",
    desc: "Compare current performance against historical baselines to detect degradation.",
  },
  {
    icon: `/analytics-api-icon.svg`,
    title: "Analytics API",
    desc: "Feed your data into Grafana, Tableau, or custom internal dashboards with our REST API.",
  },
];

const Analytics = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
      <h2 className="text-[36px] text-white font-bold mb-2">
        Actionable Analytics
      </h2>
      <p className="text-(--gray) text-lg mb-14 max-w-[45%] mx-auto">
        Turn raw monitoring data into business insights with our advanced
        visualization tools.
      </p>

      <div className="grid md:grid-cols-4 gap-8 text-left">
        {anaylics.map((item, i) => (
          <div key={i} className="group">
            <div className="mb-5">
              <Image
                src={item.icon}
                width={31}
                height={31}
                alt={`${item.title} icon`}
              />
            </div>
            <h4 className="font-bold text-lg text-white mb-2">{item.title}</h4>
            <p className="text-sm text-(--gray) leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Analytics;
