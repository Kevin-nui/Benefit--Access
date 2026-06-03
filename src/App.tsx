import { Header } from "@/components/molecules/Header";
import AppRoutes from "./routes/routes";
import { BenefitCards } from "@/components/molecules/BenefitCards";
import { Footer } from "@/components/molecules/Footer";

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
