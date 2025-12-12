# Helena Explora - Lead Capture Website

Website de captura de leads para Helena Explora, criadora de conteúdo sobre estudar nos Estados Unidos.

## 🎯 Objetivo

Capturar leads de pessoas interessadas em programas de estudo nos EUA, fornecendo informações através de um chatbot de IA e enviando emails automáticos de boas-vindas.

## 🛠️ Tecnologias

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Backend**: Lovable Cloud (Edge Functions)
- **Email**: Resend
- **IA**: Lovable AI (Google Gemini)
- **Segurança**: Cloudflare Turnstile (CAPTCHA)

## 📋 Funcionalidades

### Formulário de Captura (7 Seções)
1. **Dados Pessoais** - Nome, email, país, telefone
2. **Formação Académica** - Nível, área, ano de conclusão
3. **Experiência Profissional** - Anos, área de atuação
4. **Programa de Interesse** - Tipo de programa, dúvidas
5. **Capacidade Financeira** - Investimento, bolsas
6. **Nível de Inglês** - Iniciante a Fluente
7. **Comunicação** - Como conheceu, preferência de contato

### Mini-Chatbot "Assistente Explora"
- Responde dúvidas sobre estudo nos EUA
- Posicionado no canto inferior direito
- Bolha de boas-vindas auto-oculta após 8 segundos
- Sugestões rápidas na primeira interação
- Inclui disclaimer sobre informações gerais

### Emails Automáticos
- **Para Helena**: Notificação com todos os dados do lead
- **Para o lead**: Email de boas-vindas com links das redes sociais

## 🔒 Segurança

- ✅ **CAPTCHA Cloudflare Turnstile** - Previne spam
- ✅ **Sanitização de inputs** - Previne XSS no HTML do email
- ✅ **Rate limiting** - 5 requisições por minuto por IP
- ✅ **Mascaramento de logs** - Dados sensíveis não aparecem nos logs

## 🎨 Design

- **Cores**: Azul profissional (#0a2458) e creme (#f5f0e8)
- **Fontes**: Playfair Display (títulos), Inter (corpo)
- **Slogan**: "Sonhar é o primeiro visto. O resto é coragem."

## 📁 Estrutura

```
src/
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── LeadForm.tsx
│   ├── AIChatbot.tsx
│   └── form-sections/
│       ├── PersonalDataSection.tsx
│       ├── EducationSection.tsx
│       ├── ProfessionalSection.tsx
│       ├── ProgramSection.tsx
│       ├── FinancialSection.tsx
│       ├── EnglishSection.tsx
│       └── CommunicationSection.tsx
├── pages/
│   └── Index.tsx
└── assets/
    └── he-logo.jpg

supabase/functions/
├── send-lead-email/index.ts
└── chat/index.ts
```

## 🔗 Redes Sociais

- YouTube: [@helenaexplora](https://www.youtube.com/@helenaexplora)
- Instagram: [@helenaexplora_usa](https://www.instagram.com/helenaexplora_usa)
- TikTok: [@helenaexplora](https://www.tiktok.com/@helenaexplora)

## 📧 Contato

Email para leads: helenaexplora@hmpedro.com
