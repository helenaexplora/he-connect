import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AIChatbot from "@/components/AIChatbot";

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = "Política de Privacidade | Helena Explora";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Política de Privacidade do Helena Explora - Saiba como protegemos seus dados pessoais.");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <article className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-8 text-center">
            Política de Privacidade — Helena Explora
          </h1>

          <div className="prose prose-lg max-w-none space-y-8">
            <section className="form-section">
              <h2 className="text-xl font-serif font-semibold text-primary mb-3">Introdução</h2>
              <p className="text-muted-foreground leading-relaxed">
                A sua privacidade é muito importante para nós. Esta Política de Privacidade explica que informações recolhemos, como são utilizadas e quais são os seus direitos em relação aos seus dados pessoais.
              </p>
            </section>

            <section className="form-section">
              <h2 className="text-xl font-serif font-semibold text-primary mb-3">1. Dados que Recolhemos</h2>
              <p className="text-muted-foreground leading-relaxed">
                Recolhemos apenas as informações fornecidas voluntariamente, incluindo nome, e-mail, país, telefone, formação académica, experiência profissional, situação financeira geral, nível de inglês, objetivos e desafios. O Assistente Virtual não armazena dados pessoais fora da sessão.
              </p>
            </section>

            <section className="form-section">
              <h2 className="text-xl font-serif font-semibold text-primary mb-3">2. Como Utilizamos os Seus Dados</h2>
              <p className="text-muted-foreground leading-relaxed">
                Os dados são usados para compreender melhor a comunidade, melhorar conteúdo, identificar necessidades e aprimorar a experiência no website. Nunca utilizamos os dados para consultoria individual.
              </p>
            </section>

            <section className="form-section">
              <h2 className="text-xl font-serif font-semibold text-primary mb-3">3. Partilha de Dados</h2>
              <p className="text-muted-foreground leading-relaxed">
                Não vendemos nem partilhamos seus dados com terceiros.
              </p>
            </section>

            <section className="form-section">
              <h2 className="text-xl font-serif font-semibold text-primary mb-3">4. Segurança dos Dados</h2>
              <p className="text-muted-foreground leading-relaxed">
                Tomamos medidas razoáveis para proteger os dados, embora nenhum sistema seja totalmente seguro.
              </p>
            </section>

            <section className="form-section">
              <h2 className="text-xl font-serif font-semibold text-primary mb-3">5. Consentimento</h2>
              <p className="text-muted-foreground leading-relaxed">
                Ao utilizar o website ou preencher o formulário, você consente com esta Política.
              </p>
            </section>

            <section className="form-section">
              <h2 className="text-xl font-serif font-semibold text-primary mb-3">6. Direitos do Usuário</h2>
              <p className="text-muted-foreground leading-relaxed">
                Você pode solicitar acesso, correção ou remoção de seus dados a qualquer momento via{" "}
                <a href="mailto:helenaexplora@hmpedro.com" className="text-primary hover:underline">
                  helenaexplora@hmpedro.com
                </a>.
              </p>
            </section>

            <section className="form-section">
              <h2 className="text-xl font-serif font-semibold text-primary mb-3">7. Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                O site pode usar cookies para melhorar a experiência; nenhum recolhe dados identificáveis.
              </p>
            </section>

            <section className="form-section">
              <h2 className="text-xl font-serif font-semibold text-primary mb-3">8. Assistente Virtual</h2>
              <p className="text-muted-foreground leading-relaxed">
                O Assistente responde dúvidas gerais, não armazena dados e não fornece aconselhamento individual.
              </p>
            </section>

            <section className="form-section">
              <h2 className="text-xl font-serif font-semibold text-primary mb-3">9. Alterações</h2>
              <p className="text-muted-foreground leading-relaxed">
                Atualizações à Política podem ocorrer. A versão mais recente estará disponível no site.
              </p>
            </section>

            <section className="form-section">
              <h2 className="text-xl font-serif font-semibold text-primary mb-3">10. Contacto</h2>
              <p className="text-muted-foreground leading-relaxed">
                <a href="mailto:helenaexplora@hmpedro.com" className="text-primary hover:underline">
                  helenaexplora@hmpedro.com
                </a>
              </p>
            </section>
          </div>
        </article>
      </main>

      <Footer />
      <AIChatbot />
    </div>
  );
};

export default PrivacyPolicy;
