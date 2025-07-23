import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Sun, Moon, Clock, LogOut, ArrowLeft } from "lucide-react";
import crescentMoon from "@/assets/crescent-moon.png";

interface Prayer {
  id: string;
  name: string;
  arabicName: string;
  time: string;
  completed: boolean;
  icon: React.ReactNode;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, signOut, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);
  const [prayers, setPrayers] = useState<Prayer[]>([
    { id: "fajr", name: "Fajr", arabicName: "الفجر", time: "5:30 AM", completed: false, icon: <Sun className="w-5 h-5" /> },
    { id: "dhuhr", name: "Dhuhr", arabicName: "الظهر", time: "12:15 PM", completed: true, icon: <Sun className="w-5 h-5" /> },
    { id: "asr", name: "Asr", arabicName: "العصر", time: "3:45 PM", completed: true, icon: <Sun className="w-5 h-5" /> },
    { id: "maghrib", name: "Maghrib", arabicName: "المغرب", time: "6:20 PM", completed: false, icon: <Moon className="w-5 h-5" /> },
    { id: "isha", name: "Isha", arabicName: "العشاء", time: "8:00 PM", completed: true, icon: <Moon className="w-5 h-5" /> },
  ]);

  const completedCount = prayers.filter(prayer => prayer.completed).length;
  const completionPercentage = (completedCount / prayers.length) * 100;

  const togglePrayer = (prayerId: string) => {
    setPrayers(prev => prev.map(prayer => {
      if (prayer.id === prayerId) {
        const newCompleted = !prayer.completed;
        
        // Show toast for completion/incompletion
        toast({
          title: newCompleted ? "Prayer completed!" : "Prayer unmarked",
          description: newCompleted 
            ? `Alhamdulillahi, ${prayer.name} prayer has been marked complete.`
            : `${prayer.name} prayer has been unmarked.`,
          variant: newCompleted ? "default" : "destructive",
        });
        
        return { ...prayer, completed: newCompleted };
      }
      return prayer;
    }));
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleLogout = async () => {
    await signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out. May Allah bless you.",
    });
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-prayer flex items-center justify-center">
        <div className="text-center">
          <img 
            src={crescentMoon} 
            alt="Crescent Moon" 
            className="w-16 h-16 mx-auto mb-4 animate-pulse"
          />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-prayer">
      {/* Islamic pattern background */}
      <div className="absolute inset-0 islamic-pattern opacity-20"></div>
      
      <div className="relative z-10 p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="p-2 hover:bg-muted/50 rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            
            <img 
              src={crescentMoon} 
              alt="Crescent Moon" 
              className="w-8 h-8"
            />
            
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="p-2 hover:bg-muted/50 rounded-full"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>

          <div className="text-center fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-spiritual bg-clip-text text-transparent">
              Welcome, {user?.email?.split('@')[0] || 'Brother/Sister'}!
            </h1>
            <p className="text-muted-foreground mb-2 flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" />
              {getCurrentDate()}
            </p>
            <p className="text-sm text-muted-foreground">
              السلام عليكم - May your day be blessed
            </p>
          </div>
        </div>

        {/* Progress Summary Card */}
        <Card className="prayer-card mb-8 scale-in">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl text-foreground">Today's Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32 mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke="hsl(var(--muted))"
                    strokeWidth="8"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke="hsl(var(--success))"
                    strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - completionPercentage / 100)}`}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">{completedCount}</div>
                    <div className="text-sm text-muted-foreground">of 5</div>
                  </div>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mb-1">
                You've completed {completedCount}/5 prayers today!
              </h3>
              <p className="text-sm text-muted-foreground text-center">
                {completedCount === 5 
                  ? "Alhamdulillah! All prayers completed. May Allah accept your worship." 
                  : `${5 - completedCount} prayer${5 - completedCount > 1 ? 's' : ''} remaining. Keep up the good work!`
                }
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Prayer Cards */}
        <div className="grid gap-4 md:gap-6">
          <h2 className="text-2xl font-semibold text-center mb-4 bg-gradient-spiritual bg-clip-text text-transparent">
            Today's Salah
          </h2>
          
          {prayers.map((prayer, index) => (
            <Card 
              key={prayer.id} 
              className={`prayer-card cursor-pointer transition-all duration-300 fade-in ${
                prayer.completed ? 'prayer-completed' : ''
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => togglePrayer(prayer.id)}
            >
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <Checkbox
                    checked={prayer.completed}
                    onChange={() => togglePrayer(prayer.id)}
                    className="data-[state=checked]:bg-success data-[state=checked]:border-success"
                  />
                  
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      prayer.completed 
                        ? 'bg-success/20 text-success' 
                        : 'bg-primary/20 text-primary'
                    }`}>
                      {prayer.icon}
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-lg">
                        {prayer.name}
                        <span className="text-sm font-normal text-muted-foreground ml-2">
                          {prayer.arabicName}
                        </span>
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {prayer.time}
                      </p>
                    </div>
                  </div>
                </div>

                <div className={`text-sm px-3 py-1 rounded-full ${
                  prayer.completed 
                    ? 'bg-success/20 text-success' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {prayer.completed ? 'Completed' : 'Pending'}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Islamic blessing at bottom */}
        <div className="text-center mt-12 opacity-60">
          <p className="text-sm text-muted-foreground mb-2">
            اللهم تقبل منا صالح الأعمال
          </p>
          <p className="text-xs text-muted-foreground">
            O Allah, accept our righteous deeds
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;