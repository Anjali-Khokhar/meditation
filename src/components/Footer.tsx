import { Link } from "react-router-dom";
import { Heart, Instagram, Twitter, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-calm border-t border-border/50 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-zen rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground font-zen">Serene</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Find peace and mindfulness in your daily life with guided meditations, 
              journaling, and AI-powered wellness support.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Explore</h3>
            <div className="space-y-2">
              <Link to="/meditations" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Meditation Library
              </Link>
              <Link to="/journal" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Mindful Journal
              </Link>
              <Link to="/progress" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Track Progress
              </Link>
              <Link to="/ai-companion" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                AI Companion
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Support</h3>
            <div className="space-y-2">
              <Link to="/about" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                About Us
              </Link>
              <Link to="/contact" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Contact
              </Link>
              <Link to="/privacy" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
            <p className="text-muted-foreground text-sm">
              Join our community for daily mindfulness tips and meditation guidance.
            </p>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Serene. Made with love for your wellbeing.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;