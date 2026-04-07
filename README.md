# Say It Nicely - AI Polite Reply Generator

A web-based polite reply generator that converts raw, blunt thoughts into respectful responses using Next.js, Tailwind CSS, and OpenRouter API.

## 🚀 Key Features

- **Simplified Web Architecture**: Single-session chat application using `/` and `/chat`.
- **LocalStorage Persistence**: Conversation history is stored directly in your browser's local storage.
- **AI-Powered**: Integrates with OpenRouter (`gpt-4o-mini`) for culturally aware Indian context communication.
- **Responsive Design**: Modern, mobile-friendly UI built with Tailwind CSS.
- **Multilingual Support**: Choose between Auto-detect, English, and Hinglish output modes.

---

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **LLM**: OpenRouter API

---

## 📦 Installation & Setup

### 1. Prerequisites
- Node.js 18+
- OpenRouter API Key

### 2. Development
```bash
npm install
npm run dev
```

### 3. Production Build
```bash
npm run build
npm run start
```

---

## 🔑 Environment Variables
Create a `.env` file in the root directory:
```env
OPENROUTER_API_KEY=your_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```
