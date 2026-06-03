import { Routes, Route } from "react-router-dom";
import  Home from "@/pages/Home";
import ComingSoon from "@/pages/ComingSoon";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/terms" element={<ComingSoon />} />
      <Route path="/privacy-policy" element={<ComingSoon />} />
      <Route path="/contact-us" element={<ComingSoon />} />
      <Route path="/program-requirements" element={<ComingSoon />} />
      <Route path="/do-not-sell" element={<ComingSoon />} />
      <Route path="/unsubscribe" element={<ComingSoon />} />
    </Routes>
  );
}
