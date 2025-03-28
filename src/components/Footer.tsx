
import { AlertTriangle, Github, Twitter, Instagram, Facebook, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative z-40 border-t border-fire/30 bg-black/80 backdrop-blur-sm">
  <div className="container py-12">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
      {/* Brand Column */}
      <div>
        <Link to="/" className="flex items-center gap-2 mb-6">
          <AlertTriangle className="h-6 w-6 text-fire" />
          <span className="font-bold text-xl text-white">अग्निदृष्टि</span>
        </Link>
        <p className="text-white/80 mb-6">
          Advanced fire alert and management system powered by IoT sensors and AI technology.
        </p>
        <div className="flex space-x-4">
          {[
            { icon: Twitter, label: "Twitter" },
            { icon: Facebook, label: "Facebook" },
            { icon: Instagram, label: "Instagram" },
            { icon: Github, label: "GitHub" },
            { icon: Linkedin, label: "LinkedIn" }
          ].map((social, index) => (
            <a 
              key={index}
              href="#" 
              className="text-white/70 hover:text-fire transition-colors"
              aria-label={social.label}
            >
              <social.icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
      
      {/* Features Column */}
      <div>
        <h3 className="font-medium text-lg mb-6 text-white">Features</h3>
        <ul className="space-y-3">
          {["Fire Risk Mapping", "SOS Emergency", "Fire Alerts", "AI Crisis Chatbot", "Post-Fire Analysis"].map((item, index) => (
            <li key={index}>
              <Link 
                to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                className="text-white/80 hover:text-fire transition-colors"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Resources Column */}
      <div>
        <h3 className="font-medium text-lg mb-6 text-white">Resources</h3>
        <ul className="space-y-3">
          {["Prevention Guides", "Safety Protocols", "Fire Safety Blog", "FAQs", "Support Center"].map((item, index) => (
            <li key={index}>
              <Link 
                to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                className="text-white/80 hover:text-fire transition-colors"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Company Column */}
      <div>
        <h3 className="font-medium text-lg mb-6 text-white">Company</h3>
        <ul className="space-y-3">
          {["About Us", "Contact", "Careers", "Privacy Policy", "Terms of Service"].map((item, index) => (
            <li key={index}>
              <Link 
                to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                className="text-white/80 hover:text-fire transition-colors"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
    
    {/* Footer Bottom */}
    <div className="border-t border-fire/20 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
      <p className="text-sm text-white/70 mb-4 md:mb-0">
        © {new Date().getFullYear()} अग्निदृष्टि. All rights reserved.
      </p>
      <div className="flex space-x-6">
        {["Privacy", "Terms", "Cookies"].map((item, index) => (
          <Link 
            key={index}
            to={`/${item.toLowerCase()}`} 
            className="text-sm text-white/70 hover:text-fire transition-colors"
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  </div>
</footer>
  );
};

export default Footer;
