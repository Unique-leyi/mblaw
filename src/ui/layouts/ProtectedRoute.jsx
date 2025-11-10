
import { useEffect } from "react";
import { useUser } from "../../features/Auth/useUser";
import { redirectToLogin } from "../../util/helper";
import SpinnerOverlay from "../SpinnerOverlay";



function ProtectedRoute({ children }) {


  const { isLoading, isAuthenticated } = useUser();

  // 2. If there is NO authenticated user, redirect to the login
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isAuthenticated){
        redirectToLogin();
      } 
    }, 10000);

    return () => clearTimeout(timeout);

  }, [isAuthenticated]
  );



 // 3. While loading, show a spinner
  if (isLoading) return <SpinnerOverlay />;

  if (isAuthenticated) return children;


}

export default ProtectedRoute;
