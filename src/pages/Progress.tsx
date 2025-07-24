import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Calendar,
  Award,
  Clock,
  Target,
  Star,
  Flame,
  Heart,
  Trophy,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const Progress = () => {
  // Mock data for demonstration
  const currentStreak = 7;
  const longestStreak = 24;
  const totalSessions = 89;
  const totalMinutes = 1347;
  const monthlyGoal = 20;
  const completedThisMonth = 12;

  const weeklyData = [
    { day: "Mon", sessions: 2, minutes: 25, mood: "calm" },
    { day: "Tue", sessions: 1, minutes: 15, mood: "happy" },
    { day: "Wed", sessions: 0, minutes: 0, mood: null },
    { day: "Thu", sessions: 1, minutes: 20, mood: "focused" },
    { day: "Fri", sessions: 2, minutes: 30, mood: "peaceful" },
    { day: "Sat", sessions: 1, minutes: 10, mood: "grateful" },
    { day: "Sun", sessions: 1, minutes: 18, mood: "refreshed" }
  ];

  const achievements = [
    { id: 1, title: "First Steps", description: "Complete your first meditation", earned: true, date: "Nov 15", icon: Star },
    { id: 2, title: "Week Warrior", description: "Meditate for 7 days straight", earned: true, date: "Dec 8", icon: Flame },
    { id: 3, title: "Mindful Month", description: "Complete 30 sessions in one month", earned: false, progress: 75, icon: Calendar },
    { id: 4, title: "Time Master", description: "Meditate for 100 total minutes", earned: true, date: "Nov 28", icon: Clock },
    { id: 5, title: "Zen Master", description: "Reach a 30-day streak", earned: false, progress: 23, icon: Trophy },
    { id: 6, title: "Journal Keeper", description: "Write 50 journal entries", earned: false, progress: 60, icon: Heart }
  ];

  const monthlyStats = [
    { month: "Sep", sessions: 8, minutes: 120 },
    { month: "Oct", sessions: 15, minutes: 285 },
    { month: "Nov", sessions: 22, minutes: 410 },
    { month: "Dec", sessions: 12, minutes: 195 }
  ];

  const getDayStatus = (sessions: number) => {
    if (sessions === 0) return "bg-muted";
    if (sessions === 1) return "bg-primary/30";
    if (sessions === 2) return "bg-primary/60";
    return "bg-primary";
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-calm">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Your Progress Journey
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Track your mindfulness journey and celebrate your growth
            </p>
          </div>

          {/* Main Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-zen border-0 text-primary-foreground shadow-zen">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2">
                  <Flame className="w-5 h-5" />
                  <span>Current Streak</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-1">{currentStreak} days</div>
                <p className="text-primary-foreground/80 text-sm">
                  Longest: {longestStreak} days
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-nature border-0 text-nature-green-foreground shadow-nature">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>Total Sessions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-1">{totalSessions}</div>
                <p className="text-nature-green-foreground/80 text-sm">
                  All time sessions
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-sunset border-0 text-sunset-orange-foreground shadow-soft">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>Total Time</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-1">{Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m</div>
                <p className="text-sunset-orange-foreground/80 text-sm">
                  Time practicing
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-aurora border-0 text-primary-foreground shadow-glow">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5" />
                  <span>This Month</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-1">{completedThisMonth}/{monthlyGoal}</div>
                <p className="text-primary-foreground/80 text-sm">
                  Monthly goal
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calendar View */}
            <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-soft">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span>This Week</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-3">
                  {weeklyData.map((day, index) => (
                    <div key={index} className="text-center">
                      <div className="text-xs text-muted-foreground mb-2">{day.day}</div>
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold text-white mb-2 ${getDayStatus(day.sessions)}`}>
                        {day.sessions > 0 ? day.sessions : ""}
                      </div>
                      {day.minutes > 0 && (
                        <div className="text-xs text-muted-foreground">{day.minutes}m</div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground text-center">
                    This week: {weeklyData.reduce((sum, day) => sum + day.sessions, 0)} sessions, {weeklyData.reduce((sum, day) => sum + day.minutes, 0)} minutes
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Trends */}
            <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span>Monthly Trends</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyStats.map((stat, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <div className="font-medium text-foreground">{stat.month}</div>
                        <div className="text-sm text-muted-foreground">{stat.sessions} sessions</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-foreground">{Math.floor(stat.minutes / 60)}h {stat.minutes % 60}m</div>
                        <div className="text-sm text-muted-foreground">total time</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="lg:col-span-2 bg-card/80 backdrop-blur-sm border-border/50 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-primary" />
                  <span>Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {achievements.map((achievement) => {
                    const Icon = achievement.icon;
                    return (
                      <div
                        key={achievement.id}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                          achievement.earned
                            ? "border-primary bg-primary/10 shadow-zen"
                            : "border-border/50 bg-muted/30"
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            achievement.earned ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <h3 className={`font-semibold ${achievement.earned ? "text-foreground" : "text-muted-foreground"}`}>
                              {achievement.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              {achievement.description}
                            </p>
                            {achievement.earned ? (
                              <Badge variant="secondary" className="text-xs">
                                Earned {achievement.date}
                              </Badge>
                            ) : (
                              <div className="space-y-1">
                                <div className="w-full bg-muted rounded-full h-2">
                                  <div 
                                    className="bg-primary h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${achievement.progress}%` }}
                                  ></div>
                                </div>
                                <p className="text-xs text-muted-foreground">{achievement.progress}% complete</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Insights */}
          <Card className="mt-8 bg-gradient-aurora/10 border border-primary/20 shadow-glow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-zen rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2">Weekly Insights</h3>
                  <p className="text-muted-foreground mb-4">
                    Great progress this week! You've maintained consistency with your meditation practice. 
                    Your longest session was on Friday (30 minutes), and you've shown a preference for 
                    evening sessions. Consider trying a morning meditation to start your day mindfully.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">6/7 days active</Badge>
                    <Badge variant="secondary">118 minutes total</Badge>
                    <Badge variant="secondary">Evening preference</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Progress;