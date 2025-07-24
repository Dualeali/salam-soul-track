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
            onClick={() => navigate("/register")}
            className="btn-spiritual text-lg px-8 py-4"
          >
            Start Your Journey
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => navigate("/login")}
            className="btn-golden text-lg px-8 py-4"
          >
            Already have an account?
          </Button>
        </div>

        {/* Subtle Islamic greeting */}
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 text-center opacity-60">
          <p className="text-sm text-muted-foreground">
            بسم الله الرحمن الرحيم
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            In the name of Allah, the Most Gracious, the Most Merciful
          </p>
        </div>

        {/* Developer Footer */}
        <div className="absolute bottom-0 left-0 right-0 py-4">
          <div className="h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent mb-4"></div>
          <div className="text-center px-6">
            <p className="text-sm text-muted-foreground/80 mb-2 font-light">
              Developed by <span className="font-medium text-foreground/90">DualeDev</span> — 
              <span className="font-medium"> DESCRAPPER TECH HIMSELF</span> 💻🕌
            </p>
            <p className="text-xs text-muted-foreground/70">
              WhatsApp: <a href="https://wa.me/797400491" className="hover:text-foreground/90 transition-colors duration-200 underline">0797400491</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;