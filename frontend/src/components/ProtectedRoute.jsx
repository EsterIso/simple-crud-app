import { useAuth, RedirectToSignIn } from "@clerk/clerk-react";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useAuth();
  
  if (!isLoaded) {
    return null; // Or a loading spinner
  }
  
  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return children;
};

export default ProtectedRoute;