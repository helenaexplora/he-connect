import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AIChatbot from "@/components/AIChatbot";

const TermsOfUse = () => {
  useEffect(() => {
    document.title = "Termos de Uso | Helena Explora";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Termos de Uso do Helena Explora - Condições de utilização do website.");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <article className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-8 text-center">
            Termos de Uso — Helena Explora
          </h1>

          <div className="prose prose-lg max-w-none space-y-8">
            <section className="form-section">
              <h2 className="text-xl font-serif font-semibold text-primary mb-3">1. Aceitação dos Termos</h2>
              <p className="text-muted-foreground leading-relaxed">
                Ao utilizar este website, você concorda com estes Termos de Uso.
              </p>
            </section>

            <section className="form-section">
              <h2 className="text-xl font-serif font-semibold text-primary mb-3">2. Finalidade do Website</h2>
              <p className="text-muted-foreground leading-relaxed">
                O site Helena Explora fornece conteúdos educativos e informativos sobre estudar e viver nos EUA. Não prestamos consultoria individual, jurídica ou migratória.
              </p>
            </section>

            <section className="form-section">
              <h2 className="text-xl font-serif font-semibold text-primary mb-3">3. Uso Permitido</h2>
              <p className="text-muted-foreground leading-relaxed">
                O usuário compromete-se a utilizar o site de forma responsável e a não tentar explorar, copiar ou distribuir indevidamente qualquer conteúdo.
              </p>
            </section>

            <section className="form-section">
              <h2 className="text-xl font-serif font-semibold text-primary mb-3">4. Informações do Usuário</h2>
              <p className="text-muted-foreground leading-relaxed">
                Ao preencher formulários, você declara que as informações fornecidas são verdadeiras. O uso dos dados está descrito na Política de Privacidade.
              </p>
            </section>

            <section className="form-section">
              <h2 className="text-xl font-serif font-semibold text-primary mb-3">5. Assistente Virtual</h2>
              <p className="text-muted-foreground leading-relaxed">
                As respostas do assistente têm caráter informativo e não substituem aconselhamento profissional.
              </p>
            </section>

            <section className="form-section">
              <h2 className="text-xl font-serif font-semibold text-primary mb-3">6. Propriedade Intelectual</h2>
              <p className="text-muted-foreground leading-relaxed">
                Todo o conteúdo do site pertence ao projeto Helena Explora e não pode ser reproduzido sem autorização.
              </p>
            </section>

            <section className="form-section">
              <h2 className="text-xl font-serif font-semibold text-primary mb-3">7. Limitação de Responsabilidade</h2>
              <p className="text-muted-foreground leading-relaxed">
                O projeto não se responsabiliza por decisões tomadas com base nas informações fornecidas.
              </p>
            </section>

            <section className="form-section">
              <h2 className="text-xl font-serif font-semibold text-primary mb-3">8. Alterações aos Termos</h2>
              <p className="text-muted-foreground leading-relaxed">
                Estes Termos podem ser atualizados a qualquer momento.
              </p>
            </section>

            <section className="form-section">
              <h2 className="text-xl font-serif font-semibold text-primary mb-3">9. Contacto</h2>
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

export default TermsOfUse;
