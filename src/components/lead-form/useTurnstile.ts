import { useEffect, useRef, useState } from "react";
import { TURNSTILE_CONTAINER_ID, TURNSTILE_SITE_KEY } from "./constants";

export const useTurnstile = () => {
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileError, setTurnstileError] = useState(false);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const renderTurnstile = () => {
      const container = document.getElementById(TURNSTILE_CONTAINER_ID);
      if (!container || !window.turnstile || widgetIdRef.current) return;

      try {
        widgetIdRef.current = window.turnstile.render(`#${TURNSTILE_CONTAINER_ID}`, {
          sitekey: TURNSTILE_SITE_KEY,
          callback: (token: string) => {
            if (mounted) {
              setTurnstileToken(token);
              setTurnstileError(false);
            }
          },
          "error-callback": () => {
            console.log("Turnstile error - allowing form submission without CAPTCHA");
            if (mounted) {
              setTurnstileError(true);
              setTurnstileToken("bypass");
            }
          },
          "expired-callback": () => {
            if (mounted) setTurnstileToken(null);
          },
        });
      } catch (error) {
        console.error("Turnstile render error:", error);
        if (mounted) {
          setTurnstileError(true);
          setTurnstileToken("bypass");
        }
      }
    };

    if (window.turnstile) {
      renderTurnstile();
      return;
    }

    const existingScript = document.querySelector('script[src*="turnstile"]');
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onTurnstileLoad";
      script.async = true;
      document.head.appendChild(script);
    }

    window.onTurnstileLoad = () => {
      if (mounted) renderTurnstile();
    };

    return () => {
      mounted = false;
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        } catch (error) {
          console.error("Turnstile cleanup error:", error);
        }
      }
    };
  }, []);

  const resetTurnstile = () => {
    if (widgetIdRef.current && window.turnstile) {
      try {
        window.turnstile.reset(widgetIdRef.current);
      } catch (error) {
        console.error("Turnstile reset error:", error);
      }
    }
    setTurnstileToken(null);
  };

  return {
    turnstileError,
    turnstileToken,
    resetTurnstile,
  };
};

declare global {
  interface Window {
    turnstile: {
      render: (container: string, options: {
        sitekey: string;
        callback: (token: string) => void;
        "error-callback": () => void;
        "expired-callback": () => void;
      }) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
    onTurnstileLoad?: () => void;
  }
}
