import { notFound } from "next/navigation";
import Container from "@/app/components/ui/Container";
import legalData from "../legal-pages.json";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return legalData.pages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  const page = legalData.pages.find((item) => item.slug === slug);

  if (!page) {
    return {
      title: "Legal",
    };
  }

  return {
    title: `${page.title} – Forgent`,
    description: page.description,
  };
}

export default async function LegalPage({ params }: Props) {
  const { slug } = await params;

  const page = legalData.pages.find((item) => item.slug === slug);

  if (!page) {
    notFound();
  }

  return (
    <main className="py-28">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="mb-14">
            <h1 className="text-[36px] sm:text-[44px] md:text-[52px] font-semibold leading-tight">
              {page.title}
            </h1>

            <p className="mt-4 text-gray-600 text-lg">
              Last updated: {new Date().getFullYear()}
            </p>
          </div>

          <div className="space-y-10 text-gray-700 text-[17px] leading-relaxed">
            {page.sections.map((section, index) => (
              <section key={index}>
                {section.title && (
                  <h2 className="text-[22px] font-semibold text-black mb-3">
                    {section.title}
                  </h2>
                )}

                {section.content?.map((paragraph, i) => (
                  <p
                    key={i}
                    className={i > 0 ? "mt-4" : ""}
                    dangerouslySetInnerHTML={{
                      __html: paragraph,
                    }}
                  />
                ))}

                {section.list && (
                  <ul className="list-disc pl-6 mt-3 space-y-2">
                    {section.list.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}
