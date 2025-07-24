import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Play, BookOpen, TrendingUp, Heart, Target, Zap, Star, Loader2, Clock, Award, Sparkles, Smile, Meh, Frown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<any>(null);
  const [dailyTip, setDailyTip] = useState('');
  const [loadingTip, setLoadingTip] = useState(true);
  const [recentMeditations, setRecentMeditations] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
      return;
    }

    if (user) {
      fetchUserProfile();
      fetchDailyTip();
      fetchRecentMeditations();
    }
  }, [user, loading, navigate]);

  const fetchUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchDailyTip = async () => {
    try {
      const response = await supabase.functions.invoke('ai-chat', {
        body: {
          message: 'Generate a brief daily mindfulness tip or inspiring thought for today. Keep it under 50 words.',
          context: 'daily'
        }
      });

      if (response.data?.response) {
        setDailyTip(response.data.response);
      } else {
        setDailyTip('Take a moment today to breathe deeply and appreciate the present moment. You are exactly where you need to be. 🌸');
      }
    } catch (error) {
      setDailyTip('Remember to be kind to yourself today. Every moment is a new opportunity for peace and growth. 🌱');
    } finally {
      setLoadingTip(false);
    }
  };

  const fetchRecentMeditations = async () => {
    try {
      const { data, error } = await supabase
        .from('meditations')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) {
        console.error('Error fetching meditations:', error);
      } else {
        setRecentMeditations(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const moods = [
    { emoji: '😊', label: 'Happy', color: 'bg-yellow-500' },
    { emoji: '😌', label: 'Calm', color: 'bg-blue-500' },
    { emoji: '😟', label: 'Anxious', color: 'bg-orange-500' },
    { emoji: '😔', label: 'Sad', color: 'bg-gray-500' },
    { emoji: '😴', label: 'Tired', color: 'bg-purple-500' },
    { emoji: '🤗', label: 'Grateful', color: 'bg-green-500' },
  ];

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  const currentStreak = profile?.meditation_streak || 0;
  const totalSessions = profile?.total_sessions || 0;
  const minutesMeditated = profile?.minutes_meditated || 0;

  const dailyMood = [
    { day: "Mon", mood: "happy" },
    { day: "Tue", mood: "calm" },
    { day: "Wed", mood: "neutral" },
    { day: "Thu", mood: "happy" },
    { day: "Fri", mood: "happy" },
    { day: "Sat", mood: "calm" },
    { day: "Sun", mood: "happy" },
  ];

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case "happy": return <Smile className="w-5 h-5 text-yellow-500" />;
      case "calm": return <Heart className="w-5 h-5 text-blue-500" />;
      case "neutral": return <Meh className="w-5 h-5 text-gray-500" />;
      default: return <Smile className="w-5 h-5 text-yellow-500" />;
    }
  };

  return (
    <Layout showFooter={false}>
      <div className="min-h-screen bg-gradient-calm">
        <div className="container mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Good morning, {profile?.display_name || 'Friend'}! 🌅
            </h1>
            <p className="text-xl text-muted-foreground">
              {currentStreak > 0 
                ? `You're on a ${currentStreak}-day meditation streak. Keep up the amazing work!`
                : 'Welcome to your mindfulness journey. Ready to start your first session?'
              }
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-zen border-0 text-primary-foreground shadow-zen">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5" />
                  <span>Current Streak</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-1">{currentStreak} days</div>
                <p className="text-primary-foreground/80 text-sm">
                  Keep going strong!
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-nature border-0 text-nature-green-foreground shadow-nature">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Total Sessions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-1">{totalSessions}</div>
                <p className="text-nature-green-foreground/80 text-sm">
                  Sessions completed
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-sunset border-0 text-sunset-orange-foreground shadow-soft">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>Time Practiced</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-1">{minutesMeditated}m</div>
                <p className="text-sunset-orange-foreground/80 text-sm">
                  Minutes of mindfulness
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Daily Meditation Suggestion */}
            <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span>AI Daily Wisdom</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-aurora/20 rounded-xl p-4">
                  {loadingTip ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm text-muted-foreground">Generating wisdom...</span>
                    </div>
                  ) : (
                    <>
                      <p className="text-muted-foreground text-sm mb-4">{dailyTip}</p>
                      <div className="flex items-center space-x-4">
                        <Button variant="zen" size="sm" onClick={() => navigate('/meditations')}>
                          <Play className="w-4 h-4" />
                          Start Session
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => navigate('/ai-companion')}>
                          <Sparkles className="w-4 h-4" />
                          Chat with AI
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Mood Check-in */}
            <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-primary" />
                  <span>How Are You Feeling?</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {moods.map((mood, index) => (
                    <button
                      key={index}
                      className="flex flex-col items-center p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      onClick={() => navigate('/journal')}
                    >
                      <span className="text-2xl mb-1">{mood.emoji}</span>
                      <span className="text-xs text-muted-foreground">{mood.label}</span>
                    </button>
                  ))}
                </div>
                <Button variant="meditation" className="w-full" onClick={() => navigate('/journal')}>
                  <BookOpen className="w-4 h-4" />
                  Journal Your Feelings
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-soft">
              <CardHeader>
                <CardTitle>Quick Start</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="floating" className="w-full justify-start" onClick={() => navigate('/meditations')}>
                  <Play className="w-4 h-4" />
                  Browse Meditations
                </Button>
                <Button variant="floating" className="w-full justify-start" onClick={() => navigate('/journal')}>
                  <BookOpen className="w-4 h-4" />
                  Write in Journal
                </Button>
                <Button variant="floating" className="w-full justify-start" onClick={() => navigate('/progress')}>
                  <Calendar className="w-4 h-4" />
                  View Progress Calendar
                </Button>
                <Button variant="floating" className="w-full justify-start" onClick={() => navigate('/ai-companion')}>
                  <Sparkles className="w-4 h-4" />
                  Chat with AI Guide
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span>Recent Meditations</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentMeditations.length > 0 ? (
                  recentMeditations.map((meditation, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground text-sm">{meditation.title}</h4>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                          <span>{meditation.duration_minutes} min</span>
                          <span>•</span>
                          <span>{meditation.category}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => navigate('/meditations')}>
                        <Play className="w-3 h-3" />
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground text-sm mb-3">No sessions yet</p>
                    <Button variant="zen" size="sm" onClick={() => navigate('/meditations')}>
                      Start Your First Session
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Journal Prompt */}
          <Card className="bg-gradient-aurora/10 border border-primary/20 shadow-glow mt-8">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-zen rounded-full flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2">Today's Journal Prompt</h3>
                  <p className="text-muted-foreground mb-4">
                    "What are three things you're grateful for today, and how do they make you feel?"
                  </p>
                  <Button variant="zen" onClick={() => navigate('/journal')}>
                    Start Writing
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;