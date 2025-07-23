import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import crescentMoon from "@/assets/crescent-moon.png";
import mosqueSilhouette from "@/assets/mosque-silhouette.png";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const getCurrentDate = () => {
    const today = new Date();
    const gregorianDate = today.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    const hijriYear = 1446;
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

    if (formData.password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    const { error } = await signUp(formData.email, formData.password);
    
    setLoading(false);

    if (error) {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "✅ Registration successful!",
        description: "Please login to continue your spiritual journey.",
      });
      
      setTimeout(() => {
        navigate("/login");
      }, 1500);
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
          <p className="text-sm text-white/70">
            Assalamu Alaikum - Welcome to our community
          </p>
        </div>

        {/* Register Card */}
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
              Join Our Community
            </h1>
            <p className="text-sm text-white/70">
              Begin your prayer tracking journey
            </p>
          </div>

          {/* Register Form */}
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
              placeholder="Password (min. 6 characters)"
              value={formData.password}
              onChange={handleInputChange}
              className="login-input"
              required
              minLength={6}
              disabled={loading}
            />

            <button 
              type="submit" 
              className="login-button mt-6"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Toggle to Login */}
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-sm text-white/60 hover:text-white transition-colors duration-200"
              disabled={loading}
            >
              Already have an account? Log in
            </button>
          </div>
        </div>

        {/* Back to Welcome */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/")}
            className="text-sm text-white/60 hover:text-white transition-colors duration-200"
            disabled={loading}
          >
            ← Back to Welcome
          </button>
        </div>

        {/* Date Information */}
        <div className="text-center mt-8 opacity-60">
          <p className="text-xs text-white/50 mb-1">
            {gregorianDate}
          </p>
          <p className="text-xs text-white/50">
            {hijriDate} AH
          </p>
        </div>

        {/* Islamic blessing */}
        <div className="text-center mt-4 opacity-50">
          <p className="text-xs text-white/50">
            بارك الله فيك - May Allah bless you
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;