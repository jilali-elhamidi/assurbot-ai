# 💻 assurbot | Client Interface & Dashboard

> **"The Face of Intelligent Insurance."** — Capgemini GenAI Hackathon 2026

![Status](https://img.shields.io/badge/Status-Frontend_Ready-success) ![Tech](https://img.shields.io/badge/Stack-React_Vite_Tailwind-blue) ![UI](https://img.shields.io/badge/UI-Shadcn_Radix-black)

## 📖 About The Frontend

This repository contains the **User Interface (UI)** for the **AgentVox** system. It provides a modern, responsive dashboard where insured clients can:
* Visualize their contracts and claims.
* Interact with the **AI Voice Assistant** via a dedicated widget.
* Track the status of their requests in real-time.

Built with performance and aesthetics in mind, it uses the latest **React** ecosystem tools.

---

## ✨ Key Features

### 🎙️ AI Voice Widget
A persistent, floating voice assistant component (`VoiceAssistantWidget.tsx`) that connects to the LiveKit backend. It allows hands-free navigation and claim declaration.

### 📊 Interactive Dashboard
* **Overview (`DashboardPage`):** Real-time stats on active claims and next payments.
* **Claims Management (`ClaimsPage`):** Detailed view of accident reports, status updates, and uploaded photos.
* **Smart Contracts (`ContractsPage`):** Digital view of insurance policies (Auto/Habitation).

### 🎨 Modern UI/UX
* **Particle Effects:** Engaging background animations (`ParticlesBackground.tsx`).
* **Responsive Design:** Fully mobile-compatible using **Tailwind CSS**.
* **Accessible Components:** Built with **Shadcn UI** & Radix Primitives.

---

## 🛠️ Tech Stack

| Category | Technology | Usage |
| :--- | :--- | :--- |
| **Framework** | **React 18 + Vite** | Blazing fast frontend tooling |
| **Language** | **TypeScript** | Type-safe development |
| **Styling** | **Tailwind CSS** | Utility-first CSS framework |
| **Components** | **Shadcn UI** | High-quality, customizable components |
| **Icons** | **Lucide React** | Modern iconography |
| **Routing** | **React Router DOM** | Client-side navigation |

---

## 🚀 Installation & Setup

### Prerequisites
* Node.js (v18 or higher)
* npm or yarn
* *The AgentVox Python Backend running on port 8000*

### 1. Clone the repository
```bash
git clone https://github.com/jilali-elhamidi/assurbot-ai
cd assurbot-ai
```
### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Configure The Api
```bash
Extrait de code
VITE_LIVEKIT_URL=wss://your-project.livekit.cloud (VoiceAssistantWidget)
```
### 4.Run Development Server
```bash
npm run dev
```
Open http://localhost:8080 (or the port shown in your terminal) to view the dashboard.

## Project Structure
```
src/
├── components/
│   ├── ui/               # Reusable Shadcn components (Buttons, Cards, Inputs)
│   ├── about/            # Aesthetic components (ParticlesBackground)
│   ├── NavLink.tsx       # Navigation logic
│   └── VoiceAssistantWidget.tsx  # 🎤 The Core Voice Component
├── pages/
│   ├── LandingPage.tsx   # Public Home / Welcome Screen
│   ├── DashboardPage.tsx # User Area Main View
│   ├── ClaimsPage.tsx    # Sinistres Management
│   ├── ContractsPage.tsx # Policy Viewer
│   ├── ProfilePage.tsx   # User Settings
│   └── LoginPage.tsx     # Authentication Screen
├── lib/                  # Utils & Helpers
└── App.tsx               # Main Router Logic
```

## 🤝 Integration with Backend
```bash
This frontend is designed to work in tandem with the AgentVox Python Backend.

Token Generation: The frontend calls the backend API (/token) to get a secure LiveKit Token.

Voice Streaming: The VoiceAssistantWidget establishes a WebSocket connection to LiveKit Cloud using that token to enable real-time audio.
```
