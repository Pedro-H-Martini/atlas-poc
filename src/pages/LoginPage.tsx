import React, { useEffect } from "react";
import { useArgusAuth } from "argus-auth0-auth-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AppLogo from "@/components/AppLogo";

const LoginPage: React.FC = () => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useArgusAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/");
    }
}, [isAuthenticated, isLoading, navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="sm:sm:px-10 transition-colors flex justify-center items-center flex-col gap-8">
          <div className="space-y-6 flex justify-center flex-col">
            <AppLogo variant="vertical" className="w-60" />
            <Button
              onClick={() => {
                loginWithRedirect({appState: { returnTo: "/projects" }});
              }}
            >
              SIGN IN
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;