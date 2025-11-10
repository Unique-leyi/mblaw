import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SpinnerOverlay from "../SpinnerOverlay";
import { useUser } from "../../features/Auth/useUser";
import { useGetProfile } from "../../features/Auth/useGetProfile";

function ProtectedOnboard({ children }) {

  const { isLoading, isAuthenticated, role } = useUser();
  const { isOnboarded, isLoadingProfile } = useGetProfile();

  const navigate = useNavigate();

  useEffect(() => {
    // Wait for both auth and profile data to load
    if (isLoading || isLoadingProfile) return;

    if (!isAuthenticated) {
      navigate("/sign-in");
      return;
    }

    // If role is not Client, proceed to dashboard straight
    if (role && role !== "patient") {
      navigate("/dashboard");
      return;
    }

    // If role is Client and isOnboarded is true, go to dashboard
    if (role === "patient" && isOnboarded === true) {
      navigate("/dashboard");
      return;
    }

    // If role is Client but isOnboarded is false, stay on current page (children will render)

  }, [isAuthenticated, role, isOnboarded, navigate, isLoading, isLoadingProfile]);

  // Show spinner while loading
  if (isLoading || isLoadingProfile || isOnboarded === undefined) {
    return <SpinnerOverlay />;
  }

  // If user is authenticated and is a Client who hasn't onboarded, show onboarding
  if (isAuthenticated && role === "patient" && isOnboarded === false) {
    return children;
  }

  // While navigation is happening, show spinner
  return <SpinnerOverlay />;
}

export default ProtectedOnboard;