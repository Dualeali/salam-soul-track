import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import crescentMoon from "@/assets/crescent-moon.png";
import mosqueSilhouette from "@/assets/mosque-silhouette.png";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    const { error } = await signIn(formData.email, formData.password);
    
    setLoading(false);

    if (error) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in. May Allah bless your prayers.",
      });
      
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-login flex items-center justify-center px-6 relative">
      {/* Subtle mosque silhouette watermark */}
      <div className="absolute inset-0 flex items-end justify-center opacity-5">
        <img 
          src={mosqueSilhouette} 
          alt="Mosque silhouette" 
          className="h-64 w-auto object-contain"
        />
      </div>
      
      {/* Islamic pattern background */}
      <div className="absolute inset-0 islamic-pattern opacity-10"></div>
      
      <div className="w-full max-w-sm relative z-10 fade-in">
        {/* Greeting */}
        <div className="text-center mb-8">
          <p className="text-2xl text-primary/80 font-light mb-2 glow-text" style={{ fontFamily: 'serif' }}>
            السلام عليكم
          </p>
          <p className="text-sm" style={{ color: '#4B3F2F' }}>
            Assalamu Alaikum - Peace be upon you
          </p>
        </div>

        {/* Login Card */}
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
            <h1 className="text-2xl font-semibold" style={{ color: '#3C2F20' }}>
              Welcome Back
            </h1>
            <p className="text-sm" style={{ color: '#4B3F2F' }}>
              Continue your spiritual journey
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="email"
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleInputChange}
              className="login-input"
              required
              disabled={loading}
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="login-input"
              required
              disabled={loading}
            />

            <button 
              type="submit" 
              className="login-button mt-6"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log in to Track Salah"}
            </button>
          </form>

          {/* Toggle to Register */}
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-sm hover:text-primary transition-colors duration-200"
              style={{ color: '#4B3F2F' }}
              disabled={loading}
            >
              Don't have an account? Sign up
            </button>
          </div>
        </div>

        {/* Back to Welcome */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/")}
            className="text-sm hover:text-primary transition-colors duration-200"
            style={{ color: '#4B3F2F' }}
            disabled={loading}
          >
            ← Back to Welcome
          </button>
        </div>

        {/* Date Information */}
        <div className="text-center mt-8 opacity-60">
          <p className="text-xs mb-1" style={{ color: '#4B3F2F' }}>
            {gregorianDate}
          </p>
          <p className="text-xs" style={{ color: '#4B3F2F' }}>
            {hijriDate} AH
          </p>
        </div>

        {/* Islamic blessing */}
        <div className="text-center mt-4 opacity-50">
          <p className="text-xs" style={{ color: '#4B3F2F' }}>
            بارك الله فيك - May Allah bless you
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;