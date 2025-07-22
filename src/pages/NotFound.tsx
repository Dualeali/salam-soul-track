import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-prayer">
      <div className="absolute inset-0 islamic-pattern opacity-20"></div>
      <div className="text-center relative z-10 fade-in">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-spiritual bg-clip-text text-transparent">404</h1>
        <p className="text-xl text-muted-foreground mb-4">Oops! Page not found</p>
        <a href="/" className="btn-spiritual text-decoration-none inline-block">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
