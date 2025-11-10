import React, { Suspense, lazy } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import ScrollToTop from "./ui/ScrollTop";
import NotFoundPage from "./pages/NotFound";
import SpinnerOverlay from "./ui/SpinnerOverlay";
import PageLayout from "./ui/layouts/PageLayout";
import HomePage from "./pages/Home";




function App() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Box overflow="hidden">
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Suspense fallback={<SpinnerOverlay />}>
          <Routes>
            <Route element={<PageLayout />}>
              <Route path="/" element={<HomePage />} />
{ /*            <Route path="/about-us" element={<AboutPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/team/team-detail/:slug" element={<TeamDetailPage />} />
              <Route path="/plans/plan-detail/:slug" element={<ServiceDetailPage />} />
              <Route path="/plans" element={<ServicesPage />} />
              <Route path="/hospital-network" element={<HospitalNetworkPage />} />
              <Route path="/contact-us" element={<ContactPage />} />*/}
            </Route>


            <Route element={<PageLayout />}>
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
          <ScrollToTop />
        </Suspense>
      </BrowserRouter>
    </Box>
  );
}

export default App;