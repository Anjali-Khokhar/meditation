import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Sparkles, 
  Calendar,
  Heart,
  Smile,
  Frown,
  Meh,
  Sun,
  Zap,
  Save,
  Edit3
} from "lucide-react";

const Journal = () => {
  const [currentEntry, setCurrentEntry] = useState("");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const moods = [
    { id: "joyful", name: "Joyful", icon: Smile, color: "text-yellow-500" },
    { id: "calm", name: "Calm", icon: Heart, color: "text-blue-500" },
    { id: "neutral", name: "Neutral", icon: Meh, color: "text-gray-500" },
    { id: "anxious", name: "Anxious", icon: Zap, color: "text-orange-500" },
    { id: "sad", name: "Sad", icon: Frown, color: "text-purple-500" },
    { id: "energetic", name: "Energetic", icon: Sun, color: "text-green-500" }
  ];

  const aiPrompts = [
    "What are three things you're grateful for today, and how do they make you feel?",
    "Describe a moment today when you felt most present and mindful.",
    "What emotions did you experience today? How did you navigate through them?",
    "Write about a challenge you faced today and how you handled it.",
    "What would you like to release from today, and what would you like to carry forward?",
    "How did you show kindness to yourself or others today?"
  ];

  const [currentPrompt] = useState(aiPrompts[Math.floor(Math.random() * aiPrompts.length)]);

  const pastEntries = [
    {
      date: "Today",
      mood: "calm",
      preview: "Today was a beautiful day for reflection. I practiced morning meditation and felt...",
      length: "3 min read"
    },
    {
      date: "Yesterday", 
      mood: "joyful",
      preview: "Grateful for the small moments of joy that appeared throughout my day...",
      length: "2 min read"
    },
    {
      date: "Dec 10",
      mood: "anxious",
      preview: "Feeling a bit overwhelmed with work deadlines, but took time to breathe...",
      length: "4 min read"
    },
    {
      date: "Dec 9",
      mood: "energetic",
      preview: "Morning run was incredible! The fresh air and movement really...",
      length: "3 min read"
    }
  ];

  const getMoodIcon = (moodId: string) => {
    const mood = moods.find(m => m.id === moodId);
    if (!mood) return <Heart className="w-4 h-4" />;
    const Icon = mood.icon;
    return <Icon className={`w-4 h-4 ${mood.color}`} />;
  };

  const handleSaveEntry = () => {
    if (currentEntry.trim() && selectedMood) {
      // Here you would save to backend/storage
      console.log("Saving entry:", { entry: currentEntry, mood: selectedMood });
      setCurrentEntry("");
      setSelectedMood(null);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-calm">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Mindful Journal
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Reflect on your thoughts, emotions, and experiences with guided prompts and mindful awareness
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Journal Entry */}
            <div className="lg:col-span-2 space-y-6">
              {/* AI Prompt Card */}
              <Card className="bg-gradient-aurora/10 border border-primary/20 shadow-glow">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <span>Today's Reflection Prompt</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground italic text-lg leading-relaxed">
                    "{currentPrompt}"
                  </p>
                </CardContent>
              </Card>

              {/* Mood Selector */}
              <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-soft">
                <CardHeader>
                  <CardTitle>How are you feeling right now?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                    {moods.map((mood) => {
                      const Icon = mood.icon;
                      return (
                        <button
                          key={mood.id}
                          onClick={() => setSelectedMood(mood.id)}
                          className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                            selectedMood === mood.id
                              ? "border-primary bg-primary/10 shadow-zen"
                              : "border-border/50 hover:border-primary/50"
                          }`}
                        >
                          <div className="flex flex-col items-center space-y-2">
                            <Icon className={`w-6 h-6 ${mood.color}`} />
                            <span className="text-xs font-medium text-foreground">
                              {mood.name}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Journal Writing Area */}
              <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Edit3 className="w-5 h-5 text-primary" />
                    <span>Write Your Thoughts</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={currentEntry}
                    onChange={(e) => setCurrentEntry(e.target.value)}
                    placeholder="Start writing your thoughts, feelings, or reflections here..."
                    className="min-h-[300px] bg-background/50 border-border/50 rounded-xl resize-none focus:ring-2 focus:ring-primary/50"
                  />
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-muted-foreground">
                      {currentEntry.length > 0 && (
                        <span>{currentEntry.split(' ').filter(word => word.length > 0).length} words</span>
                      )}
                    </div>
                    
                    <Button 
                      variant="zen" 
                      onClick={handleSaveEntry}
                      disabled={!currentEntry.trim() || !selectedMood}
                    >
                      <Save className="w-4 h-4" />
                      Save Entry
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <Card className="bg-gradient-zen border-0 text-primary-foreground shadow-zen">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">This Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Entries Written</span>
                      <span className="font-bold">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Current Streak</span>
                      <span className="font-bold">5 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Mindful Moments</span>
                      <span className="font-bold">127</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Insights */}
              <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <span>AI Insights</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gradient-nature/20 rounded-lg p-3">
                    <p className="text-sm text-foreground">
                      Your recent entries show a pattern of morning gratitude practices. 
                      Consider continuing this positive habit!
                    </p>
                  </div>
                  <div className="bg-gradient-sunset/20 rounded-lg p-3">
                    <p className="text-sm text-foreground">
                      You've mentioned feeling more energetic after meditation sessions. 
                      This is wonderful progress!
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Entries */}
              <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span>Recent Entries</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {pastEntries.map((entry, index) => (
                    <div key={index} className="p-3 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted/70 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">{entry.date}</span>
                        <div className="flex items-center space-x-2">
                          {getMoodIcon(entry.mood)}
                          <Badge variant="secondary" className="text-xs">
                            {entry.length}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {entry.preview}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Journal;