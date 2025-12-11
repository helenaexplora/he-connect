import Header from "@/components/Header";
import LeadForm from "@/components/LeadForm";
import AIChatbot from "@/components/AIChatbot";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "Helena Explora - Estudar nos Estados Unidos";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Junte-se à comunidade Helena Explora e receba dicas sobre como estudar nos Estados Unidos. Informações sobre programas, CPT, OPT, bolsas e vida acadêmica.");
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = "Junte-se à comunidade Helena Explora e receba dicas sobre como estudar nos Estados Unidos. Informações sobre programas, CPT, OPT, bolsas e vida acadêmica.";
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-3">
            Faça Parte da Nossa Comunidade
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Preencha o formulário abaixo para receber conteúdos exclusivos sobre 
            estudar nos Estados Unidos, dicas de inglês e muito mais!
          </p>
        </div>

        <LeadForm />
      </main>

      <Footer />
      <AIChatbot />
    </div>
  );
};

export default Index;
