import { CheckCircle2 } from "lucide-react";

const CheckIntervals = () => {
  const stats = [
    { label: "MIN INTERVAL", value: "30s" },
    { label: "STATUS VALID", value: "2xx" },
    { label: "PAYLOAD CHECK", value: "JSON" },
    { label: "CUSTOM METHODS", value: "POST" },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="bg-[#1E293B] border border-[#10B77F33] aspect-square flex flex-col items-center justify-center p-6 rounded-2xl"
            >
              <span className="text-4xl font-bold text-(--primary) mb-2">
                {stat.value}
              </span>
              <span className="text-[10px] font-bold text-(--gray) tracking-widest uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <div className="text-white">
          <h2 className="text-[30px] font-extrabold mb-4">
            Check Intervals & Precision
          </h2>
          <p className="text-(--gray) mb-10 leading-normal text-lg">
            Precision matters when every second of downtime costs revenue.
            Define exactly how and when we talk to your servers.
          </p>

          <div className="space-y-8">
            {[
              {
                title: "Granular Intervals",
                desc: "Choose from 30 seconds to 60 minutes for every single monitor.",
              },
              {
                title: "Smart Status Matching",
                desc: "Define 'Up' as specific status codes (e.g., allow 401 for auth endpoints).",
              },
              {
                title: "Keyword Assertion",
                desc: "Ensure specific text or JSON keys are present in the response body.",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="mt-1">
                  <CheckCircle2 className="text-(--primary) w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">{item.title}</h4>
                  <p className="text-base text-(--gray)">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckIntervals;
