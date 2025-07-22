import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import crescentMoon from "@/assets/crescent-moon.png";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

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
    <div className="min-h-screen bg-gradient-prayer flex items-center justify-center px-6 relative">
      {/* Islamic pattern background */}
      <div className="absolute inset-0 islamic-pattern opacity-30"></div>
      
      <div className="w-full max-w-md relative z-10">
        <Card className="prayer-card border-0 shadow-[var(--shadow-prayer)]">
          <CardHeader className="text-center pb-4">
            <img 
              src={crescentMoon} 
              alt="Crescent Moon" 
              className="w-12 h-12 mx-auto mb-4"
            />
            <CardTitle className="text-2xl bg-gradient-spiritual bg-clip-text text-transparent">
              {isLogin ? "Welcome Back" : "Join the Journey"}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {isLogin 
                ? "Continue your spiritual path with mindful prayer tracking"
                : "Let's begin your spiritual journey together"
              }
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="h-12 border-border focus:ring-primary"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="h-12 border-border focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="h-12 border-border focus:ring-primary"
                />
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full btn-spiritual text-lg h-12"
              >
                {isLogin ? "Log in to Track Salah" : "Begin Spiritual Journey"}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {isLogin 
                    ? "Don't have an account? Register here" 
                    : "Already have an account? Sign in"
                  }
                </button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="text-sm text-accent-foreground hover:text-foreground transition-colors"
                >
                  ← Back to Welcome
                </button>
              </div>
            </CardFooter>
          </form>
        </Card>

        {/* Islamic blessing */}
        <div className="text-center mt-6 opacity-70">
          <p className="text-sm text-muted-foreground">
            بارك الله فيك - May Allah bless you
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;