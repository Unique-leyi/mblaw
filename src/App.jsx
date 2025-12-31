import React, { Suspense, lazy } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import ScrollToTop from "./ui/ScrollTop";
import SpinnerOverlay from "./ui/SpinnerOverlay";
import PageLayout from "./ui/layouts/PageLayout";
import DashboardLayout from "./ui/layouts/DashboardLayout";
import ProtectedRoute from "./ui/layouts/ProtectedRoute";
import RoleBasedRoute from "./ui/RoleBasedRoute";

// Lazy load all pages
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const TeamPage = lazy(() => import("./pages/TeamPage"));
const TeamDetailPage = lazy(() => import("./pages/TeamDetailPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogDetailPage = lazy(() => import("./pages/BlogDetailPage"));
const PracticeAreasPage = lazy(() => import("./pages/PracticeAreasPage"));
const PracticeAreaDetailPage = lazy(() => import("./pages/PracticeAreaDetailPage"));
const BookConsultationPage = lazy(() => import("./pages/BookConsultationPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const CreateAccountPage = lazy(() => import("./pages/CreateAccountPage"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
const VerifyOTPPage = lazy(() => import("./pages/VerifyOTPPage"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const DashboardOverviewPage = lazy(() => import("./pages/DashboardOverviewPage"));
const ConsultationsDashboardPage = lazy(() => import("./pages/ConsultationsDashboardPage"));
const ConsultationDetailPage = lazy(() => import("./pages/ConsultationDetailPage"));
const AppointmentsDashboardPage = lazy(() => import("./pages/AppointmentsDashboardPage"));
const AppointmentDetailPage = lazy(() => import("./pages/AppointmentDetailPage"));
const AppointmentEditPage = lazy(() => import("./pages/AppointmentEditPage"));
const AppointmentCreatePage = lazy(() => import("./pages/AppointmentCreatePage"));
const BlogManagementPage = lazy(() => import("./pages/BlogManagementPage"));
const BlogPostDetailPage = lazy(() => import("./pages/BlogPostDetailPage"));
const BlogPostCreatePage = lazy(() => import("./pages/BlogPostCreatePage"));
const BlogPostEditPage = lazy(() => import("./pages/BlogPostEditPage"));
const TeamMembersPage = lazy(() => import("./pages/TeamMembersPage"));
const SettingsDashboardPage = lazy(() => import("./pages/SettingsDashboardPage"));
const MyAccountPage = lazy(() => import("./pages/MyAccountPage"));
const MyOverviewPage = lazy(() => import("./pages/MyOverviewPage"));
const MyConsultationsPage = lazy(() => import("./pages/MyConsultationsPage"));
const MyAppointmentsPage = lazy(() => import("./pages/MyAppointmentsPage"));
const MySettingsPage = lazy(() => import("./pages/MySettingsPage"));
const MyConsultationDetailPage = lazy(() => import("./pages/MyConsultationDetailPage"));
const MyAppointmentDetailPage = lazy(() => import("./pages/MyAppointmentDetailPage"));
const UsersDashboardPage = lazy(() => import("./pages/UsersDashboardPage"));
const CreateClientPage = lazy(() => import("./pages/CreateClientPage"));
const EditClientPage = lazy(() => import("./pages/EditClientPage"));
const CreateTeamMemberPage = lazy(() => import("./pages/CreateTeamMemberPage"));
const EditTeamMemberPage = lazy(() => import("./pages/EditTeamMemberPage"));
const ContactsDashboardPage = lazy(() => import("./pages/ContactsDashboardPage"));
const ContactDetailPage = lazy(() => import("./pages/ContactDetailPage"));

function App() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Box overflow="hidden">
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Suspense fallback={<SpinnerOverlay />}>
          <Routes>
            {/* Public site routes */}
            <Route element={<PageLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about-us" element={<AboutPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/team/team-detail/:slug" element={<TeamDetailPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/post-detail/:slug" element={<BlogDetailPage />} />
              <Route path="/practice-areas" element={<PracticeAreasPage />} />
              <Route path="/practice-areas/:slug" element={<PracticeAreaDetailPage />} />
              <Route path="/book-consultation" element={<BookConsultationPage />} />
              <Route path="/contact-us" element={<ContactPage />} />
              <Route path="/create-account" element={<CreateAccountPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/verify-otp" element={<VerifyOTPPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>

            {/* User Account routes (for regular users) */}
            <Route
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route
                path="/my-account"
                element={
                  <RoleBasedRoute roles={["user"]}>
                    <MyOverviewPage />
                  </RoleBasedRoute>
                }
              />
              <Route
                path="/my-account/consultations"
                element={
                  <RoleBasedRoute roles={["user"]}>
                    <MyConsultationsPage />
                  </RoleBasedRoute>
                }
              />
              <Route
                path="/my-account/appointments"
                element={
                  <RoleBasedRoute roles={["user"]}>
                    <MyAppointmentsPage />
                  </RoleBasedRoute>
                }
              />
              <Route
                path="/my-account/settings"
                element={
                  <RoleBasedRoute roles={["user"]}>
                    <MySettingsPage />
                  </RoleBasedRoute>
                }
              />
              <Route
                path="/my-account/consultations/:id"
                element={
                  <RoleBasedRoute roles={["user"]}>
                    <MyConsultationDetailPage />
                  </RoleBasedRoute>
                }
              />
              <Route
                path="/my-account/appointments/:id"
                element={
                  <RoleBasedRoute roles={["user"]}>
                    <MyAppointmentDetailPage />
                  </RoleBasedRoute>
                }
              />
            </Route>

            {/* Dashboard routes (for admins) */}
            <Route
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route
                path="/dashboard"
                element={
                  <RoleBasedRoute roles={["super_admin", "admin"]}>
                    <DashboardOverviewPage />
                  </RoleBasedRoute>
                }
              />
              <Route
                path="/dashboard/consultations"
                element={
                  <RoleBasedRoute roles={["super_admin", "admin"]}>
                    <ConsultationsDashboardPage />
                  </RoleBasedRoute>
                }
              />
              <Route
                path="/dashboard/consultations/:id"
                element={
                  <RoleBasedRoute roles={["super_admin", "admin"]}>
                    <ConsultationDetailPage />
                  </RoleBasedRoute>
                }
              />
              <Route
                path="/dashboard/appointments"
                element={
                  <RoleBasedRoute roles={["super_admin", "admin"]}>
                    <AppointmentsDashboardPage />
                  </RoleBasedRoute>
                }
              />
              <Route
                path="/dashboard/appointments/:id"
                element={
                  <RoleBasedRoute roles={["super_admin", "admin"]}>
                    <AppointmentDetailPage />
                  </RoleBasedRoute>
                }
              />
              <Route
                path="/dashboard/appointments/create"
                element={
                  <RoleBasedRoute roles={["super_admin", "admin"]}>
                    <AppointmentCreatePage />
                  </RoleBasedRoute>
                }
              />
              <Route
                path="/dashboard/appointments/:id/edit"
                element={
                  <RoleBasedRoute roles={["super_admin", "admin"]}>
                    <AppointmentEditPage />
                  </RoleBasedRoute>
                }
              />
              <Route
                path="/dashboard/blog-management"
                element={
                  <RoleBasedRoute roles={["super_admin", "admin"]}>
                    <BlogManagementPage />
                  </RoleBasedRoute>
                }
              />
              <Route
                path="/dashboard/blog-management/create"
                element={
                  <RoleBasedRoute roles={["super_admin", "admin"]}>
                    <BlogPostCreatePage />
                  </RoleBasedRoute>
                }
              />
              <Route
                path="/dashboard/blog-management/:id"
                element={
                  <RoleBasedRoute roles={["super_admin", "admin"]}>
                    <BlogPostDetailPage />
                  </RoleBasedRoute>
                }
              />
              <Route
                path="/dashboard/blog-management/:id/edit"
                element={
                  <RoleBasedRoute roles={["super_admin", "admin"]}>
                    <BlogPostEditPage />
                  </RoleBasedRoute>
                }
              />
              <Route
                path="/dashboard/clients"
                element={
                  <RoleBasedRoute roles={["super_admin", "admin"]}>
                    <UsersDashboardPage />
                  </RoleBasedRoute>
                }
              />
              <Route
                path="/dashboard/clients/create"
                element={
                  <RoleBasedRoute roles={["super_admin", "admin"]}>
                    <CreateClientPage />
                  </RoleBasedRoute>
                }
              />
              <Route
                path="/dashboard/clients/:id/edit"
                element={
                  <RoleBasedRoute roles={["super_admin", "admin"]}>
                    <EditClientPage />
                  </RoleBasedRoute>
                }
              />
              <Route
                path="/dashboard/team-members"
                element={
                  <RoleBasedRoute roles={["super_admin"]}>
                    <TeamMembersPage />
                  </RoleBasedRoute>
                }
              />
              <Route
                path="/dashboard/team-members/create"
                element={
                  <RoleBasedRoute roles={["super_admin"]}>
                    <CreateTeamMemberPage />
                  </RoleBasedRoute>
                }
              />
              <Route
                path="/dashboard/team-members/:id/edit"
                element={
                  <RoleBasedRoute roles={["super_admin"]}>
                    <EditTeamMemberPage />
                  </RoleBasedRoute>
                }
              />
              <Route
                path="/dashboard/contacts"
                element={
                  <RoleBasedRoute roles={["super_admin"]}>
                    <ContactsDashboardPage />
                  </RoleBasedRoute>
                }
              />
              <Route
                path="/dashboard/contacts/:id"
                element={
                  <RoleBasedRoute roles={["super_admin"]}>
                    <ContactDetailPage />
                  </RoleBasedRoute>
                }
              />
              <Route
                path="/dashboard/settings"
                element={
                  <RoleBasedRoute roles={["super_admin", "admin"]}>
                    <SettingsDashboardPage />
                  </RoleBasedRoute>
                }
              />
            </Route>
          </Routes>
          <ScrollToTop />
        </Suspense>
      </BrowserRouter>
    </Box>
  );
}

export default App;