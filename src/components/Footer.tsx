
import { AlertTriangle, Github, Twitter, Instagram, Facebook, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-fire/20 bg-black/60">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6">
              <AlertTriangle className="h-6 w-6 text-fire" />
              <span className="font-bold text-xl fire-text">अग्निदृष्टि</span>
            </Link>
            <p className="text-muted-foreground mb-6">
              Advanced fire alert and management system powered by IoT sensors and AI technology.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-fire transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-fire transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-fire transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-fire transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-fire transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-6">Features</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/map" className="text-muted-foreground hover:text-fire transition-colors">
                  Fire Risk Mapping
                </Link>
              </li>
              <li>
                <Link to="/sos" className="text-muted-foreground hover:text-fire transition-colors">
                  SOS Emergency
                </Link>
              </li>
              <li>
                <Link to="/alerts" className="text-muted-foreground hover:text-fire transition-colors">
                  Fire Alerts
                </Link>
              </li>
              <li>
                <Link to="/chat" className="text-muted-foreground hover:text-fire transition-colors">
                  AI Crisis Chatbot
                </Link>
              </li>
              <li>
                <Link to="/reports" className="text-muted-foreground hover:text-fire transition-colors">
                  Post-Fire Analysis
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-6">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/prevention" className="text-muted-foreground hover:text-fire transition-colors">
                  Prevention Guides
                </Link>
              </li>
              <li>
                <Link to="/protocols" className="text-muted-foreground hover:text-fire transition-colors">
                  Safety Protocols
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-fire transition-colors">
                  Fire Safety Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-fire transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-muted-foreground hover:text-fire transition-colors">
                  Support Center
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-6">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-fire transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-fire transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-muted-foreground hover:text-fire transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-fire transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-fire transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-fire/10 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} अग्निदृष्टि. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-fire transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-fire transition-colors">
              Terms
            </Link>
            <Link to="/cookies" className="text-sm text-muted-foreground hover:text-fire transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
