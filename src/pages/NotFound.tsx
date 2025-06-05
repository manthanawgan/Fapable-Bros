
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="animate-fade-in">
          <h1 className="text-8xl font-black mb-4 gradient-text">404</h1>
          <h2 className="text-3xl font-bold mb-4">Bro Not Found</h2>
          <p className="text-xl text-gray-400 mb-8">
            This page has gone to the gym and never came back.
          </p>
          <Button 
            onClick={() => navigate('/')}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl hover-lift"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
