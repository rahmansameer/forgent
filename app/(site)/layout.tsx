import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import CookieConsent from "@/app/components/ui/CookieConsent";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div>
        {children}
        <CookieConsent />
      </div>
      <Footer />
    </>
  );
}
