import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import crescentMoon from "@/assets/crescent-moon.png";
import mosqueSilhouette from "@/assets/mosque-silhouette.png";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  // Get current dates
  const getCurrentDate = () => {
    const today = new Date();
    const gregorianDate = today.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    // Simple Hijri date approximation (for demo purposes)
    const hijriYear = 1446; // Current approximate Hijri year
    const hijriMonths = ['Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani', 'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Shaban', 'Ramadan', 'Shawwal', 'Dhu al-Qadah', 'Dhu al-Hijjah'];
    const currentHijriMonth = hijriMonths[today.getMonth()];
    const hijriDate = `${today.getDate()} ${currentHijriMonth} ${hijriYear}`;
    
    return { gregorianDate, hijriDate };
  };

  const { gregorianDate, hijriDate } = getCurrentDate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.email || !formData.password) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!isLogin && !formData.name) {
      toast({
        title: "Missing name",
        description: "Please enter your name to register.",
        variant: "destructive",
      });
      return;
    }

    // Simulate successful login/register
    toast({
      title: isLogin ? "Welcome back!" : "Account created!",
      description: isLogin 
        ? "You have successfully logged in. May Allah bless your prayers." 
        : "Your spiritual journey begins now. Barakallahu feek!",
    });
    
    // Navigate to dashboard after short delay
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-login flex items-center justify-center px-6 relative">
      {/* Mosque silhouette watermark - more prominent */}
      <div className="absolute inset-0 flex items-center justify-center opacity-15">
        <img 
          src={mosqueSilhouette} 
          alt="Mosque silhouette" 
          className="h-96 w-auto object-contain"
        />
      </div>
      
      {/* Islamic pattern background */}
      <div className="absolute inset-0 islamic-pattern opacity-20"></div>
      
      <div className="w-full max-w-md relative z-10 fade-in">
        {/* Arabic Greeting with Glow */}
        <div className="text-center mb-12">
          <p className="text-3xl text-white/90 font-light mb-3 arabic-glow">
            السلام عليكم
          </p>
          <p className="text-sm text-white/70 font-light tracking-wide">
            Assalamu Alaikum - Peace be upon you
          </p>
        </div>

        {/* Login Card with Glass Morphism */}
        <div className="login-card scale-in">
          {/* Crescent Moon Icon */}
          <div className="flex justify-center mb-6">
            <img 
              src={crescentMoon} 
              alt="Crescent Moon" 
              className="w-12 h-12"
            />
          </div>

          {/* Welcome Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-white mb-2">
              {isLogin ? "Welcome Back" : "Join Our Community"}
            </h1>
            <p className="text-sm text-white/70">
              {isLogin 
                ? "Continue your spiritual journey"
                : "Begin your prayer tracking journey"
              }
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <input
                name="name"
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                className="login-input"
                required={!isLogin}
              />
            )}

            <input
              name="email"
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleInputChange}
              className="login-input"
              required
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="login-input"
              required
            />

            <button 
              type="submit" 
              className="login-button mt-8"
            >
              {isLogin ? "Log in to Track Salah" : "Create Account"}
            </button>
          </form>

          {/* Toggle Login/Register */}
          <div className="text-center mt-8">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-white/60 hover:text-white transition-colors duration-200"
            >
              {isLogin 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Log in"
              }
            </button>
          </div>
        </div>

        {/* Back to Welcome */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/")}
            className="text-sm text-white/60 hover:text-white transition-colors duration-200"
          >
            ← Back to Welcome
          </button>
        </div>

        {/* Date Information */}
        <div className="text-center mt-10 opacity-70">
          <p className="text-xs text-white/60 mb-1">
            {gregorianDate}
          </p>
          <p className="text-xs text-white/60">
            {hijriDate} AH
          </p>
        </div>

        {/* Islamic blessing */}
        <div className="text-center mt-4 opacity-60">
          <p className="text-xs text-white/50">
            بارك الله فيك - May Allah bless you
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;