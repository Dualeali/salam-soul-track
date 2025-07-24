import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import crescentMoon from "@/assets/crescent-moon.png";
import mosqueSilhouette from "@/assets/mosque-silhouette.png";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-prayer relative overflow-hidden">
      {/* Bismillah at top right */}
      <div className="absolute top-6 right-6 text-right z-20 fade-in">
        <p className="text-lg text-foreground/80 font-light" style={{ fontFamily: 'serif' }}>
          بسم الله الرحمن الرحيم
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          In the name of Allah, the Most Gracious, the Most Merciful
        </p>
      </div>

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

        {/* Developer Footer */}
        <div className="absolute bottom-0 left-0 right-0 py-6 bg-gradient-to-t from-background/20 to-transparent">
          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-4 mx-8"></div>
          <div className="text-center px-6 fade-in">
            <div className="bg-background/10 backdrop-blur-sm rounded-lg py-3 px-6 mx-auto max-w-md">
              <p className="text-sm font-medium mb-1" style={{ color: '#3C2F20' }}>
                Developed by <span className="text-primary font-semibold">DualeDev</span>
              </p>
              <p className="text-xs mb-2" style={{ color: '#4B3F2F' }}>
                DESCRAPPER TECH HIMSELF 💻🕌
              </p>
              <p className="text-xs" style={{ color: '#4B3F2F' }}>
                WhatsApp: <a href="https://wa.me/797400491" className="text-primary hover:text-primary/80 transition-colors duration-200 underline font-medium">0797400491</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;