import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart, User } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-background/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-zen rounded-full flex items-center justify-center animate-breathe">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground font-zen">Serene</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/meditations" className="text-foreground hover:text-primary transition-colors">
              Meditations
            </Link>
            <Link to="/journal" className="text-foreground hover:text-primary transition-colors">
              Journal
            </Link>
            <Link to="/progress" className="text-foreground hover:text-primary transition-colors">
              Progress
            </Link>
            <Link to="/ai-companion" className="text-foreground hover:text-primary transition-colors">
              AI Guide
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="meditation" size="sm">
              <User className="w-4 h-4" />
              Sign In
            </Button>
            <Button variant="zen" size="sm">
              Start Free
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border/50 pt-4 animate-fade-in-up">
            <nav className="flex flex-col space-y-4">
              <Link to="/meditations" className="text-foreground hover:text-primary transition-colors">
                Meditations
              </Link>
              <Link to="/journal" className="text-foreground hover:text-primary transition-colors">
                Journal
              </Link>
              <Link to="/progress" className="text-foreground hover:text-primary transition-colors">
                Progress
              </Link>
              <Link to="/ai-companion" className="text-foreground hover:text-primary transition-colors">
                AI Guide
              </Link>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="meditation" size="sm">
                  <User className="w-4 h-4" />
                  Sign In
                </Button>
                <Button variant="zen" size="sm">
                  Start Free
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;