import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Send,
  Bot,
  User,
  Heart,
  Lightbulb,
  MessageCircle,
  Mic,
  MicOff,
  RotateCcw
} from "lucide-react";

const AICompanion = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content: "Hello! I'm your AI wellness companion. I'm here to support your mindfulness journey with personalized guidance, meditation suggestions, and thoughtful conversations. How are you feeling today?",
      timestamp: new Date(Date.now() - 5 * 60000),
    },
    {
      id: 2,
      type: "user", 
      content: "I've been feeling a bit anxious lately and having trouble sleeping.",
      timestamp: new Date(Date.now() - 4 * 60000),
    },
    {
      id: 3,
      type: "ai",
      content: "I understand that anxiety and sleep difficulties can be really challenging. It's wonderful that you're reaching out for support. For anxiety, I recommend trying our 'Anxiety Relief Breathing' meditation - it uses a 4-7-8 breathing technique that can help calm your nervous system. For sleep, our 'Deep Sleep Journey' with nature sounds might be perfect. Would you like me to guide you through a quick breathing exercise right now?",
      timestamp: new Date(Date.now() - 3 * 60000),
    }
  ]);

  const quickPrompts = [
    "Suggest a meditation for stress",
    "Help me feel more grateful", 
    "I need motivation today",
    "How can I be more mindful?",
    "Give me a calming quote",
    "Help with work anxiety"
  ];

  const dailyInsights = [
    {
      title: "Morning Intention",
      content: "Set a peaceful intention for your day: 'I choose to approach today with curiosity and kindness.'",
      type: "intention",
      icon: Lightbulb
    },
    {
      title: "Mindful Moment",
      content: "Take three deep breaths and notice one thing you're grateful for right now.",
      type: "practice",
      icon: Heart
    },
    {
      title: "Evening Reflection", 
      content: "What brought you joy today? Even small moments count and deserve recognition.",
      type: "reflection",
      icon: Sparkles
    }
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: "user" as const,
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");

    // Simulate AI response (would use Gemini API in real implementation)
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: "ai" as const,
        content: generateAIResponse(inputMessage),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  const generateAIResponse = (message: string) => {
    // Simple response logic - would use Gemini API in real app
    const lowercaseMessage = message.toLowerCase();
    
    if (lowercaseMessage.includes("stress") || lowercaseMessage.includes("anxious")) {
      return "I hear that you're experiencing some stress. Let's work through this together. Try this: Place one hand on your chest and one on your belly. Breathe in slowly for 4 counts, hold for 4, then exhale for 6 counts. This activates your parasympathetic nervous system. Would you like me to recommend a specific stress-relief meditation?";
    }
    
    if (lowercaseMessage.includes("sleep") || lowercaseMessage.includes("tired")) {
      return "Sleep is so important for our wellbeing. I recommend creating a calming bedtime routine: try our 'Progressive Muscle Relaxation' meditation 30 minutes before bed, avoid screens for an hour before sleep, and consider some gentle stretching. Our 'Sleep Stories' collection might also help quiet your mind. Which appeals to you most?";
    }
    
    if (lowercaseMessage.includes("grateful") || lowercaseMessage.includes("thankful")) {
      return "Gratitude is such a powerful practice! Here's a simple exercise: Think of three specific things you're grateful for today. For each one, really feel the appreciation in your body. Notice how this shifts your energy. Our 'Gratitude Garden' meditation can help deepen this practice. Would you like to explore more gratitude techniques?";
    }
    
    return "Thank you for sharing that with me. Your awareness and willingness to explore these feelings is already a step toward growth. Every moment is an opportunity to begin again with kindness toward yourself. What would feel most supportive for you right now - a breathing exercise, a meditation recommendation, or just continuing our conversation?";
  };

  const handleQuickPrompt = (prompt: string) => {
    setInputMessage(prompt);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Voice recognition would be implemented here
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-calm">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              AI Wellness Companion
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your personal mindfulness guide, powered by AI to support your journey to inner peace
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Daily Insights Sidebar */}
            <div className="lg:col-span-1 space-y-4">
              <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-lg">Daily Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {dailyInsights.map((insight, index) => {
                    const Icon = insight.icon;
                    return (
                      <div key={index} className="p-3 bg-gradient-aurora/10 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Icon className="w-4 h-4 text-primary" />
                          <span className="font-medium text-sm text-foreground">{insight.title}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{insight.content}</p>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="floating" size="sm" className="w-full justify-start text-xs">
                    <Heart className="w-3 h-3" />
                    Daily Mood Check
                  </Button>
                  <Button variant="floating" size="sm" className="w-full justify-start text-xs">
                    <Sparkles className="w-3 h-3" />
                    Get Meditation Suggestion
                  </Button>
                  <Button variant="floating" size="sm" className="w-full justify-start text-xs">
                    <RotateCcw className="w-3 h-3" />
                    Clear Conversation
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Chat Area */}
            <div className="lg:col-span-3">
              <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-soft h-[600px] flex flex-col">
                <CardHeader className="border-b border-border/50">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Bot className="w-5 h-5 text-primary" />
                      <span>Serene AI</span>
                      <Badge variant="secondary" className="text-xs">Online</Badge>
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="floating"
                        size="sm"
                        onClick={toggleListening}
                        className={isListening ? "bg-primary text-primary-foreground" : ""}
                      >
                        {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${
                        message.type === "user" ? "flex-row-reverse space-x-reverse" : ""
                      }`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.type === "user" 
                            ? "bg-gradient-zen" 
                            : "bg-gradient-aurora"
                        }`}>
                          {message.type === "user" ? (
                            <User className="w-4 h-4 text-primary-foreground" />
                          ) : (
                            <Bot className="w-4 h-4 text-primary-foreground" />
                          )}
                        </div>
                        
                        <div className={`rounded-2xl p-3 ${
                          message.type === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}>
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          <p className={`text-xs mt-2 ${
                            message.type === "user" 
                              ? "text-primary-foreground/70" 
                              : "text-muted-foreground"
                          }`}>
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Prompts */}
                <div className="p-4 border-t border-border/50">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {quickPrompts.map((prompt, index) => (
                      <Button
                        key={index}
                        variant="meditation"
                        size="sm"
                        onClick={() => handleQuickPrompt(prompt)}
                        className="text-xs"
                      >
                        {prompt}
                      </Button>
                    ))}
                  </div>

                  {/* Input Area */}
                  <div className="flex items-center space-x-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Ask me anything about mindfulness, meditation, or wellbeing..."
                      className="flex-1 rounded-full border-border/50 bg-background/50"
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                    <Button
                      variant="zen"
                      size="sm"
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim()}
                      className="rounded-full"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* AI Capabilities */}
          <Card className="mt-8 bg-gradient-aurora/10 border border-primary/20 shadow-glow">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">What I Can Help You With</h3>
                <p className="text-muted-foreground">Powered by advanced AI to provide personalized mindfulness support</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-zen rounded-full flex items-center justify-center mx-auto mb-3">
                    <MessageCircle className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Personalized Guidance</h4>
                  <p className="text-sm text-muted-foreground">
                    Get customized meditation recommendations and mindfulness practices based on your current needs and mood.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-nature rounded-full flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-6 h-6 text-nature-green-foreground" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Emotional Support</h4>
                  <p className="text-sm text-muted-foreground">
                    Share your feelings and receive compassionate, evidence-based strategies for managing emotions and stress.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-sunset rounded-full flex items-center justify-center mx-auto mb-3">
                    <Lightbulb className="w-6 h-6 text-sunset-orange-foreground" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Mindful Learning</h4>
                  <p className="text-sm text-muted-foreground">
                    Learn mindfulness techniques, get insights about your meditation patterns, and discover new ways to grow.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AICompanion;