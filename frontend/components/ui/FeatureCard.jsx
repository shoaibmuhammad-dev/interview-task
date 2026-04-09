import Image from "next/image";

const FeatureCard = ({ icon: Icon, title, description, width, height }) => (
  <div className="bg-[#10221C80] border border-[#10B77F1A] p-8 rounded-2xl hover:border-primary/30 transition-all group">
    <Image src={Icon} width={width} height={height} alt={`${title} icon`} />
    <h3 className="text-xl font-bold mb-3 text-white mt-5">{title}</h3>
    <p className="text-(--gray) leading-relaxed text-base">{description}</p>
  </div>
);

export default FeatureCard;
