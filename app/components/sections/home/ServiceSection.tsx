import Container from "../../ui/Container";
import { Workflow, Search, TrendingUp, Mail } from "lucide-react";

const services = [
  {
    title: "Lead Gen Automation",
    description:
      "We build systems that find, qualify, and enrich leads automatically so your team spends less time searching and more time selling.",
    icon: Search,
  },
  {
    title: "Outreach Automation",
    description:
      "Personalized cold email and follow-up systems that engage prospects consistently and keep conversations moving at scale.",
    icon: Mail,
  },
  {
    title: "Sales Automation",
    description:
      "From lead routing to meeting booking and CRM updates, we automate the busy work that slows down your sales team.",
    icon: TrendingUp,
  },
  {
    title: "Workflow Automation",
    description:
      "We automate the repetitive, manual work your team does every day so they can focus on things that actually move the business forward.",
    icon: Workflow,
  },
];

type ServiceCardProps = {
  title: string;
  description: string;
  icon: React.ElementType;
};

function ServiceCard({ title, description, icon: Icon }: ServiceCardProps) {
  return (
    <div
      className="
        flex
        h-full
        min-h-[230px] md:min-h-[270px]
        w-full
        flex-col
        rounded-2xl
        border
        border-gray-200
        bg-[#f7f8f9]
        p-5 sm:p-6
        transition-colors
        duration-300
      "
    >
      {/* Icon */}
      <div className="mb-6">
        <Icon
          className="h-5 w-5 sm:h-6 sm:w-6 text-primary"
          strokeWidth={2.1}
        />
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-[18px] sm:text-[20px] leading-[24px] sm:leading-[26px] font-medium tracking-[-0.03em] text-black">
          {title}
        </h3>

        <p className="mt-3 text-[14px] sm:text-[15px] leading-[23px] sm:leading-[26px] font-normal text-[#6b7280]">
          {description}
        </p>
      </div>

      {/* <button className="mt-7 inline-flex items-center gap-2 text-[14px] font-medium text-black">
        Learn more
        <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.2} />
      </button> */}
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="bg-[#f1f2f3] py-4 md:py-8">
      <div className="mx-4 sm:mx-5 rounded-3xl border border-gray-200 bg-white py-14 sm:py-16 lg:py-28">
        <Container>
          {/* Header */}
          <div className="mx-auto max-w-[980px] text-center">
            <h2 className="text-[26px] sm:text-[30px] md:text-[34px] lg:text-[38px] leading-[1.1] font-semibold text-black">
              Business Automation Solutions
            </h2>

            <p className="mt-4 text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.7] text-black/60">
              Custom AI solutions built to simplify and scale your business.
            </p>
          </div>

          {/* Grid */}
          <div className="mt-10 md:mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                icon={service.icon}
              />
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
