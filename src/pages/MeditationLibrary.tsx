import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Search, 
  Filter, 
  Clock, 
  Heart,
  Star,
  Pause,
  Volume2,
  Download,
  Moon,
  Zap,
  Focus,
  Smile
} from "lucide-react";
import meditationIcon from "@/assets/meditation-icon.jpg";
import sleepIcon from "@/assets/sleep-meditation.jpg";
import heroImage from "@/assets/hero-meditation.jpg";

const MeditationLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSession, setCurrentSession] = useState<string | null>(null);

  const categories = [
    { id: "all", name: "All", icon: Star, color: "bg-gradient-aurora" },
    { id: "sleep", name: "Sleep", icon: Moon, color: "bg-gradient-zen" },
    { id: "stress", name: "Stress Relief", icon: Heart, color: "bg-gradient-nature" },
    { id: "focus", name: "Focus", icon: Focus, color: "bg-gradient-sunset" },
    { id: "energy", name: "Energy", icon: Zap, color: "bg-gradient-aurora" },
    { id: "happiness", name: "Happiness", icon: Smile, color: "bg-gradient-calm" }
  ];

  const meditations = [
    {
      id: "1",
      title: "Deep Sleep Meditation",
      description: "A calming journey to peaceful rest with gentle rain sounds",
      duration: "30 min",
      category: "sleep",
      difficulty: "Beginner",
      image: sleepIcon,
      rating: 4.8,
      plays: 12500,
      instructor: "Sarah Chen"
    },
    {
      id: "2", 
      title: "Morning Energy Boost",
      description: "Start your day with clarity and positive intention",
      duration: "15 min",
      category: "energy",
      difficulty: "Intermediate",
      image: heroImage,
      rating: 4.9,
      plays: 8900,
      instructor: "Marcus Thompson"
    },
    {
      id: "3",
      title: "Stress Release & Anxiety Relief",
      description: "Let go of tension and find your center",
      duration: "20 min", 
      category: "stress",
      difficulty: "Beginner",
      image: meditationIcon,
      rating: 4.7,
      plays: 15600,
      instructor: "Dr. Elena Rodriguez"
    },
    {
      id: "4",
      title: "Focus & Concentration",
      description: "Enhance mental clarity for work and study",
      duration: "12 min",
      category: "focus",
      difficulty: "Intermediate",
      image: heroImage,
      rating: 4.6,
      plays: 6700,
      instructor: "James Park"
    },
    {
      id: "5",
      title: "Gratitude & Joy Meditation", 
      description: "Cultivate appreciation and inner happiness",
      duration: "18 min",
      category: "happiness", 
      difficulty: "Beginner",
      image: meditationIcon,
      rating: 4.9,
      plays: 9200,
      instructor: "Luna Williams"
    },
    {
      id: "6",
      title: "Progressive Muscle Relaxation",
      description: "Release physical tension throughout your body",
      duration: "25 min",
      category: "stress",
      difficulty: "Beginner",
      image: sleepIcon,
      rating: 4.5,
      plays: 7800,
      instructor: "Dr. Michael Foster"
    }
  ];

  const filteredMeditations = meditations.filter(meditation => {
    const matchesSearch = meditation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meditation.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || meditation.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePlayPause = (sessionId: string) => {
    if (currentSession === sessionId && isPlaying) {
      setIsPlaying(false);
    } else {
      setCurrentSession(sessionId);
      setIsPlaying(true);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-calm">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Meditation Library
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our collection of guided meditations designed to support your wellness journey
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search meditations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-xl border-border/50 bg-card/80 backdrop-blur-sm"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "zen" : "floating"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="rounded-full"
                  >
                    <Icon className="w-4 h-4" />
                    {category.name}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Meditation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMeditations.map((meditation) => (
              <Card key={meditation.id} className="bg-card/80 backdrop-blur-sm border-border/50 shadow-soft hover:shadow-zen transition-all duration-300 hover:-translate-y-1 group overflow-hidden">
                <div className="relative">
                  <img
                    src={meditation.image}
                    alt={meditation.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      variant="zen"
                      size="lg"
                      className="rounded-full shadow-glow"
                      onClick={() => handlePlayPause(meditation.id)}
                    >
                      {currentSession === meditation.id && isPlaying ? (
                        <Pause className="w-6 h-6" />
                      ) : (
                        <Play className="w-6 h-6" />
                      )}
                    </Button>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-black/50 text-white border-0">
                      <Clock className="w-3 h-3 mr-1" />
                      {meditation.duration}
                    </Badge>
                  </div>

                  {/* Rating */}
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="bg-black/50 text-white border-0">
                      <Star className="w-3 h-3 mr-1 fill-current text-yellow-400" />
                      {meditation.rating}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-semibold text-foreground line-clamp-2">
                      {meditation.title}
                    </CardTitle>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {meditation.description}
                  </p>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className={getDifficultyColor(meditation.difficulty)}>
                      {meditation.difficulty}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {meditation.plays.toLocaleString()} plays
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      by {meditation.instructor}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Volume2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredMeditations.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No meditations found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}

          {/* Currently Playing Bar */}
          {currentSession && isPlaying && (
            <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border/50 p-4 shadow-lg z-50">
              <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-zen rounded-lg flex items-center justify-center animate-zen-pulse">
                    <Volume2 className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">
                      {filteredMeditations.find(m => m.id === currentSession)?.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">Now playing</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handlePlayPause(currentSession)}
                  >
                    <Pause className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setCurrentSession(null);
                      setIsPlaying(false);
                    }}
                  >
                    ×
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MeditationLibrary;