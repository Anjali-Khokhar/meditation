import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { useNavigate } from "react-router-dom";
import { Play, BookOpen, TrendingUp, Sparkles, Heart, Smile, Star } from "lucide-react";
import heroImage from "@/assets/hero-meditation.jpg";
import meditationIcon from "@/assets/meditation-icon.jpg";
import sleepIcon from "@/assets/sleep-meditation.jpg";

const Index = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-aurora opacity-30"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 font-display">
              Find Your 
              <span className="bg-gradient-zen bg-clip-text text-transparent"> Inner Peace</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Experience guided meditations, mindful journaling, and AI-powered wellness 
              support on your journey to tranquility and self-discovery.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                variant="zen" 
                size="lg" 
                className="text-lg px-8 py-4"
                onClick={() => navigate('/auth')}
              >
                <Play className="w-5 h-5" />
                Start Your Journey
              </Button>
              <Button 
                variant="calm" 
                size="lg" 
                className="text-lg px-8 py-4"
                onClick={() => navigate('/meditations')}
              >
                <BookOpen className="w-5 h-5" />
                Explore Meditations
              </Button>
            </div>

            <div className="flex items-center justify-center space-x-6 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-zen rounded-full animate-zen-pulse"></div>
                <span>Free to start</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-nature rounded-full animate-zen-pulse animation-delay-1000"></div>
                <span>No ads</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-sunset rounded-full animate-zen-pulse animation-delay-2000"></div>
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-calm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Everything You Need for Mindfulness</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover a complete wellness ecosystem designed to support your mental health journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Meditation Library */}
            <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 shadow-soft hover:shadow-zen transition-all duration-300 hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-gradient-zen rounded-xl flex items-center justify-center mb-4 group-hover:animate-breathe">
                <Play className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Guided Meditations</h3>
              <p className="text-muted-foreground">
                Explore hundreds of guided sessions for sleep, stress relief, focus, and spiritual growth.
              </p>
            </div>

            {/* Journaling */}
            <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 shadow-soft hover:shadow-nature transition-all duration-300 hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-gradient-nature rounded-xl flex items-center justify-center mb-4 group-hover:animate-breathe">
                <BookOpen className="w-8 h-8 text-nature-green-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Mindful Journaling</h3>
              <p className="text-muted-foreground">
                Reflect on your thoughts with AI-generated prompts and track your emotional journey.
              </p>
            </div>

            {/* Progress Tracking */}
            <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 shadow-soft hover:shadow-sunset transition-all duration-300 hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-gradient-sunset rounded-xl flex items-center justify-center mb-4 group-hover:animate-breathe">
                <TrendingUp className="w-8 h-8 text-sunset-orange-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Progress Tracking</h3>
              <p className="text-muted-foreground">
                Visualize your mindfulness journey with streaks, achievements, and insightful analytics.
              </p>
            </div>

            {/* AI Companion */}
            <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 shadow-soft hover:shadow-glow transition-all duration-300 hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-gradient-aurora rounded-xl flex items-center justify-center mb-4 group-hover:animate-breathe">
                <Sparkles className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">AI Wellness Guide</h3>
              <p className="text-muted-foreground">
                Get personalized meditation recommendations and wellness insights powered by AI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meditation Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Choose Your Practice</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find the perfect meditation for your current state of mind and wellness goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sleep Meditations */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl mb-4">
                <img 
                  src={sleepIcon} 
                  alt="Sleep Meditations" 
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold mb-2">Sleep & Rest</h3>
                  <p className="text-white/90">Peaceful meditations for better sleep</p>
                </div>
              </div>
            </div>

            {/* Stress Relief */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl mb-4">
                <img 
                  src={meditationIcon} 
                  alt="Stress Relief" 
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold mb-2">Stress Relief</h3>
                  <p className="text-white/90">Find calm in moments of tension</p>
                </div>
              </div>
            </div>

            {/* Focus & Productivity */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl mb-4">
                <img 
                  src={heroImage} 
                  alt="Focus Meditations" 
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold mb-2">Focus & Clarity</h3>
                  <p className="text-white/90">Enhance concentration and mental clarity</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-calm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">What Our Community Says</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands who have transformed their lives through mindfulness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah M.",
                quote: "Serene has completely transformed my sleep routine. The guided meditations are incredibly soothing.",
                rating: 5
              },
              {
                name: "David L.",
                quote: "The AI companion provides such personalized insights. It's like having a wellness coach in my pocket.",
                rating: 5
              },
              {
                name: "Maria R.",
                quote: "I love the journaling feature. It helps me process my emotions and track my mental wellness journey.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-card/80 backdrop-blur-sm rounded-xl p-6 shadow-soft">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.quote}"</p>
                <p className="font-semibold text-foreground">— {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-gradient-zen rounded-3xl p-12 shadow-glow">
            <Heart className="w-16 h-16 text-primary-foreground mx-auto mb-6 animate-breathe" />
            <h2 className="text-4xl font-bold text-primary-foreground mb-4">
              Begin Your Mindfulness Journey Today
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Join our community and discover the peace that comes from within. 
              Start with a free meditation session.
            </p>
            <Button 
              variant="calm" 
              size="lg" 
              className="text-lg px-8 py-4"
              onClick={() => navigate('/auth')}
            >
              <Smile className="w-5 h-5" />
              Start Free Trial
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
