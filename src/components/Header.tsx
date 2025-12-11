import logoImage from "@/assets/he-logo.jpg";

const Header = () => {
  return (
    <header className="gradient-hero py-8 px-4 text-primary-foreground">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="flex items-center gap-4">
            <img 
              src={logoImage} 
              alt="Helena Explora Logo" 
              className="w-16 h-16 rounded-full object-cover border-2 border-primary-foreground/30"
            />
            <h1 className="text-3xl md:text-4xl font-bold font-serif">
              Helena Explora
            </h1>
          </div>
          <p className="text-xl md:text-2xl font-serif italic opacity-90 max-w-2xl">
            "Sonhar é o primeiro visto. O resto é coragem."
          </p>
          <p className="text-sm md:text-base opacity-80 max-w-xl">
            Compartilhando minha jornada como estudante internacional nos Estados Unidos
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
