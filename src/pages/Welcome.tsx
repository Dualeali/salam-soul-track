import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import crescentMoon from "@/assets/crescent-moon.png";
import mosqueSilhouette from "@/assets/mosque-silhouette.png";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-prayer relative overflow-hidden">
      {/* Islamic pattern background */}
      <div className="absolute inset-0 islamic-pattern"></div>
      
      {/* Mosque silhouette in background */}
      <div className="absolute bottom-0 left-0 right-0 h-48 opacity-20">
        <img 
          src={mosqueSilhouette} 
          alt="Mosque silhouette" 
          className="w-full h-full object-cover object-bottom"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        {/* Header with crescent moon */}
        <div className="text-center fade-in">
          <img 
            src={crescentMoon} 
            alt="Crescent Moon" 
            className="w-20 h-20 mx-auto mb-6"
          />
          
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-spiritual bg-clip-text text-transparent">
            Prayer Tracker
          </h1>
          
          <div className="mb-8">
            <p className="text-2xl md:text-3xl font-light text-foreground mb-2">
              السلام عليكم
            </p>
            <p className="text-xl text-muted-foreground">
              Assalamu Alaikum!
            </p>
          </div>
        </div>

        {/* Welcome message */}
        <div className="text-center max-w-md fade-in scale-in mb-12">
          <p className="text-lg text-muted-foreground mb-6">
            Begin your spiritual journey with mindful prayer tracking. 
            Stay connected with your daily Salah and build lasting spiritual habits.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 fade-in scale-in">
          <Button 
            onClick={() => navigate("/login")}
            className="btn-spiritual text-lg px-8 py-4"
          >
            Start Your Journey
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => navigate("/dashboard")}
            className="btn-golden text-lg px-8 py-4"
          >
            Continue as Guest
          </Button>
        </div>

        {/* Subtle Islamic greeting at bottom */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center opacity-60">
          <p className="text-sm text-muted-foreground">
            بسم الله الرحمن الرحيم
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            In the name of Allah, the Most Gracious, the Most Merciful
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;