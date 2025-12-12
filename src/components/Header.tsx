import { Link, useLocation } from "react-router-dom";
import logoImage from "@/assets/he-logo.jpg";

const Header = () => {
  const location = useLocation();
  
  return (
    <header className="gradient-hero py-8 px-4 text-primary-foreground">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-4 hover:opacity-90 transition-opacity">
              <img 
                src={logoImage} 
                alt="Helena Explora Logo" 
                className="w-16 h-16 rounded-full object-cover border-2 border-primary-foreground/30"
              />
              <h1 className="text-3xl md:text-4xl font-bold font-serif">
                Helena Explora
              </h1>
            </Link>
          </div>
          <p className="text-xl md:text-2xl font-serif italic opacity-90 max-w-2xl">
            "Sonhar é o primeiro visto. O resto é coragem."
          </p>
          
          <nav className="flex gap-6 mt-2">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-all hover:opacity-100 ${
                location.pathname === "/" ? "opacity-100 underline underline-offset-4" : "opacity-80"
              }`}
            >
              Início
            </Link>
            <Link 
              to="/sobre" 
              className={`text-sm font-medium transition-all hover:opacity-100 ${
                location.pathname === "/sobre" ? "opacity-100 underline underline-offset-4" : "opacity-80"
              }`}
            >
              Sobre
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
