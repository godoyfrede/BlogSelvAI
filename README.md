# 🐆 Selv.AI Blog

**Blog Oficial Selv.AI** - Focado em UX/UI, Inteligência Artificial e Desenvolvimento.

---

## 🛠 Integrações e Configuração

### 1. Sistema de Comentários (Giscus)
Utilizamos o [Giscus](https://giscus.app) que acopla o GitHub Discussions diretamente ao blog.
Para configurar a moderação e visualização correta:
1. Ative o Features -> Discussions no seu repositório GitHub.
2. Instale o Giscus App no repositório.
3. Mapeie as variáveis requeridas no `.env.local` referentes ao repo (ver `.env.example`).
4. Toda moderação de spam e deleção de comentários é feita diretamente na aba Discussions do GitHub no seu repositório.

### 2. Captura de Leads / Newsletter (Mailchimp)
Os leads dos leitores são registrados via o endpoint `/api/newsletter` conectado com a API V3 do Mailchimp.
Para o fluxo de *Double Opt-in*:
1. No [Mailchimp](https://mailchimp.com), obtenha sua API Key, Data Center (`usX`) e List ID em Audience Settings.
2. Clone o `.env.example` para `.env.local` e insira suas credenciais.
3. Customize a automação natural do Mailchimp para o painel de confirmações de inscritos (Settings -> Signup Forms). O código já envia o payload com `status: 'pending'`, o que engatilha o Mailchimp a enviar o email de confirmação diretamente para o leitor. O Template de email é gerido puramente pelo Mailchimp.

---

## 🚀 Como Executar

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) e divirta-se.
