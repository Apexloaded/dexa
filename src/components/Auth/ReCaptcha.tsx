"use client";

import { useEffect } from "react";

type Props = {
  onVerify: (token: string) => void;
};
function ReCaptcha({ onVerify }: Props) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const loadRecaptcha = () => {
      (window as any).grecaptcha.ready(() => {
        (window as any).grecaptcha
          .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, {
            action: "submit",
          })
          .then((token: string) => {
            onVerify(token);
          });
      });
    };

    if (typeof window !== "undefined" && (window as any).grecaptcha) {
      loadRecaptcha();
    } else {
      window.addEventListener("load", loadRecaptcha);
      return () => {
        window.removeEventListener("load", loadRecaptcha);
      };
    }
  }, [onVerify]);

  return null;
}

export default ReCaptcha;
