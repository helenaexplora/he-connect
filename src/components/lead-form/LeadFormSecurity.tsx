import { TURNSTILE_CONTAINER_ID } from "./constants";

interface LeadFormSecurityProps {
  turnstileError: boolean;
  turnstileToken: string | null;
}

const LeadFormSecurity = ({
  turnstileError,
  turnstileToken,
}: LeadFormSecurityProps) => {
  return (
    <div className="form-section !p-4 md:!p-6">
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm text-muted-foreground text-center">
          🔒 Verificação de segurança
        </p>
        <div id={TURNSTILE_CONTAINER_ID} />
        {turnstileError && (
          <p className="text-xs text-muted-foreground text-center">
            Verificação não disponível. Você ainda pode enviar o formulário.
          </p>
        )}
        {turnstileToken && !turnstileError && (
          <p className="text-xs text-accent text-center">
            ✓ Verificação concluída
          </p>
        )}
      </div>
    </div>
  );
};

export default LeadFormSecurity;
