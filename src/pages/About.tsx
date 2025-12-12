import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AIChatbot from "@/components/AIChatbot";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    document.title = "Sobre - Helena Explora";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Conheça a história de Helena Pedro e a missão do projeto Helena Explora. Um espaço dedicado a quem sonha estudar ou viver nos Estados Unidos.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero Section */}
        <section className="text-center mb-16 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
            Sobre o Helena Explora
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Um espaço de partilha, inspiração e informação para quem sonha expandir horizontes.
          </p>
        </section>

        {/* Quem é Helena */}
        <section className="form-section mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <h2 className="section-title">
            <span className="w-2 h-8 bg-primary rounded-full"></span>
            Quem é Helena Pedro?
          </h2>
          <div className="prose prose-lg max-w-none text-foreground/90">
            <p className="mb-4">
              Sou uma estudante angolana que vive nos Estados Unidos e criei o Helena Explora para partilhar a minha experiência real como estudante internacional — desafios, descobertas, aprendizagens e oportunidades.
            </p>
            <p>
              Acredito que cada história importa e que o conhecimento pode abrir caminhos para quem sonha expandir horizontes.
            </p>
          </div>
        </section>

        {/* O que é o projeto */}
        <section className="form-section mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h2 className="section-title">
            <span className="w-2 h-8 bg-primary rounded-full"></span>
            O que é o projeto Helena Explora?
          </h2>
          <div className="prose prose-lg max-w-none text-foreground/90">
            <p className="mb-4">
              O Helena Explora é um espaço dedicado a quem deseja compreender melhor como funcionam os estudos, a vida académica e o dia a dia nos Estados Unidos.
            </p>
            <p className="mb-4">
              Aqui, partilho informações gerais, vivências reais e caminhos possíveis para quem sonha estudar ou viver fora, sempre com autenticidade, fé e coragem.
            </p>
            <p className="font-medium text-primary">
              A missão do projeto é inspirar, informar e aproximar a comunidade de conteúdos educativos que ajudem cada pessoa a tomar decisões mais seguras sobre o seu futuro.
            </p>
          </div>
        </section>

        {/* Assistente Virtual */}
        <section className="form-section mb-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <h2 className="section-title">
            <span className="w-2 h-8 bg-primary rounded-full"></span>
            Assistente Virtual 24h
          </h2>
          <div className="prose prose-lg max-w-none text-foreground/90">
            <p className="mb-4">
              Se tiver dúvidas gerais sobre estudar, viver ou preparar-se para oportunidades nos EUA, pode conversar com o Assistente Virtual do Helena Explora.
            </p>
            <p>
              Ele está disponível 24 horas por dia aqui no site e foi treinado para responder a perguntas frequentes com clareza, simplicidade e carinho.
            </p>
          </div>
        </section>

        {/* Por que preencher o formulário */}
        <section className="form-section mb-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <h2 className="section-title">
            <span className="w-2 h-8 bg-primary rounded-full"></span>
            Por que preencher o formulário?
          </h2>
          <div className="prose prose-lg max-w-none text-foreground/90">
            <p className="mb-4">
              Cada pessoa que chega até aqui tem uma história única. O formulário existe para conhecer melhor o teu percurso, os teus sonhos e as dúvidas que tens neste momento.
            </p>
            <p className="mb-4">
              Eu leio todas as respostas com carinho. Elas ajudam-me a compreender o que a comunidade realmente precisa e a criar conteúdos que façam sentido para vocês — vídeos, explicações, lives, temas motivacionais e materiais educativos.
            </p>
            <p className="text-muted-foreground italic">
              O formulário não é para atendimentos individuais, mas sim para construir conteúdos que apoiem toda a comunidade de forma segura e responsável.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center mt-12 p-8 rounded-2xl gradient-accent animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-4">
            Faça Parte da Comunidade 💙✨
          </h2>
          <p className="text-foreground/80 mb-6 max-w-xl mx-auto">
            Preenche o formulário e partilha um pouco sobre a tua história. Cada resposta aproxima-nos mais e ajuda a construir um espaço onde todos aprendem, inspiram-se e sonham juntos.
          </p>
          <Button asChild size="lg" className="font-semibold">
            <Link to="/">Preencher Formulário</Link>
          </Button>
        </section>
      </main>

      <Footer />
      <AIChatbot />
    </div>
  );
};

export default About;
