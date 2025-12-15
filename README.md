# Helena Explora — AI-Assisted Web Platform

Helena Explora is an AI-assisted educational web platform designed to share general information and real experiences about studying and living in the United States.

The project focuses on responsible AI usage, user experience, and security, combining low-code tooling with custom development to build a scalable, real-world system.

---

## Problem

Many people interested in studying abroad lack clear and accessible information.  
At the same time, AI-powered platforms often risk providing unsafe, personalized, or misleading advice.

The challenge was to build a system that:
- uses AI responsibly,
- remains educational (not advisory),
- scales without manual support,
- protects user data and system integrity.

---

## Solution

I designed and built an AI-assisted web platform that:
- captures user intent through a structured form,
- provides general educational responses via a controlled AI chatbot,
- automates communication with strict AI guardrails,
- prioritizes UX, security, and ethical AI behavior.

---

## Future Improvements

- Add analytics and dashboards to understand form completion rates and chatbot interaction patterns.
- Improve accessibility (keyboard navigation, ARIA labels, contrast checks) for mobile-first and inclusive UX.
- Introduce multi-step form UX with progress indicators to reduce drop-off on long mobile forms.
- Implement prompt versioning and A/B testing for safer, more consistent AI behavior over time.
- Expand automated email templates with localization (PT/EN) and better onboarding flows.
- Add monitoring/alerting for edge functions and email delivery failures (retries, dead-letter handling).

---

## Key Features

- Mini AI chatbot with system-level prompts and behavioral constraints  
- Secure, mobile-first lead capture form  
- Automated email workflows:
  - Internal notifications with lead data
  - User welcome emails with onboarding links  
- AI safety guardrails preventing personalized or advisory responses  

---

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, shadcn/ui  
- **Backend:** Lovable Cloud (Edge Functions)  
- **AI:** Lovable AI (Google Gemini)  
- **Email:** Resend  
- **Security:**  
  - Cloudflare Turnstile (CAPTCHA)  
  - Input sanitization (XSS prevention)  
  - Rate limiting (5 req/min per IP)  
  - Log masking (no sensitive data exposure)

---

## AI Design & Guardrails

A core part of this project was defining how the AI should behave.

Implemented:
- system prompts enforcing educational-only responses,
- strict avoidance of personalized, legal, or immigration advice,
- consistent tone and scope across chat and email AI,
- iterative testing using real user scenarios to refine boundaries.

The AI acts as a supportive educational assistant, not a consultant.

---

## Security Considerations

- CAPTCHA protection against spam and abuse  
- Input sanitization before email rendering  
- Rate limiting to mitigate automated attacks  
- Masked logs to avoid exposing sensitive user data  

---

## Impact

- Real users interacting with the platform  
- Reduced manual support through AI-assisted flows  
- Scalable system balancing automation and human oversight  

---

## Key Takeaway

This project demonstrates how AI can be integrated into a real product safely and responsibly — as a controlled system component, not as hype.
