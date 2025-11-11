import React, { Suspense, lazy } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import ScrollToTop from "./ui/ScrollTop";
import SpinnerOverlay from "./ui/SpinnerOverlay";
import PageLayout from "./ui/layouts/PageLayout";

// Lazy load all pages
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const TeamPage = lazy(() => import("./pages/TeamPage"));
const TeamDetailPage = lazy(() => import("./pages/TeamDetailPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogDetailPage = lazy(() => import("./pages/BlogDetailPage"));
const PracticeAreasPage = lazy(() => import("./pages/PracticeAreasPage"));
const PracticeAreaDetailPage = lazy(() => import("./pages/PracticeAreaDetailPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const CreateAccountPage = lazy(() => import("./pages/CreateAccountPage"));
const ChangePasswordPage = lazy(() => import("./pages/ChangePasswordPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

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
              <Route path="/about-us" element={<AboutPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/team/team-detail/:slug" element={<TeamDetailPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/post-detail/:slug" element={<BlogDetailPage />} />
              <Route path="/practice-areas" element={<PracticeAreasPage />} />
              <Route path="/practice-areas/:slug" element={<PracticeAreaDetailPage />} />
              <Route path="/contact-us" element={<ContactPage />} />
              <Route path="/create-account" element={<CreateAccountPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/change-password" element={<ChangePasswordPage />} />
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