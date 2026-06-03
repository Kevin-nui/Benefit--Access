import { Header } from "@/components/Header";
import AppRoutes from "../routes";
import { BenefitCards } from "@/components/BenefitCards";
import { Footer } from "@/components/Footer";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <AppRoutes />

      <BenefitCards />
      <Footer />
    </div>
  );
}
