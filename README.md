# K-Pulse: Smart Rehab System ( •̀ ω •́ )✧

An interactive rehabilitation experience powered by mobile sensors and WebSockets. The user places their smartphone inside a physical ball, and their physical movements are translated into real-time actions within a game displayed on an external screen.

---

## Architecture (oﾟvﾟ)ノ

![architecture](assets/architecture.png)

The system is composed of three main modules:

1.  **Controller**: Mobile app (React + Vite). Captures smartphone sensor data and emits events to the server. It acts as the system's primary input device.
2.  **Screen**: Large display app (React + Vite). Receives events and renders the visual experience and games. It acts as the system's visual output.
3.  **Server**: Backend (Express + Socket.io). Connects the controller and screen in real-time and persists clinical data in Supabase.

---

## Complete Flow o(〃＾▽＾〃)

`QR scan` → `Onboarding` → `Form (5 questions)` → `Instructions` → `Calibration` → `Game 1` → `Stats` → `Game 2` → `Stats` → `Email` → `Ending`

1.  The **Screen** generates a unique `room_code` and displays a QR code.
2.  The **Controller** (mobile phone) scans the QR code and joins the same room.
3.  The **Server** pairs both devices using Socket.io rooms.
4.  Every action on the mobile controller is instantly reflected on the main screen.
5.  At the end of the session, the patient's email and form responses are securely saved to **Supabase**.

---

## Database (¬‿¬" )

![Supabase Schema](assets/supabase-schema.png)

### Tables and Relationships

| Table              | Description                                                      |
| :----------------- | :--------------------------------------------------------------- |
| `patients`         | Patient data (email).                                            |
| `sessions`         | Each game session, linked to a patient and a unique `room_code`. |
| `survey_responses` | Answers from the 5-question onboarding form.                     |
| `game_results`     | Score and duration of each game per session.                     |

---

## Tech Stack (づ ᴗ \_ᴗ)づ♡

| Layer             | Technology                                         |
| :---------------- | :------------------------------------------------- |
| **Frontend**      | React + TypeScript + Vite + Tailwind CSS + DaisyUI |
| **Backend**       | Node.js + Express + Socket.io                      |
| **Database**      | Supabase (PostgreSQL)                              |
| **QR Generation** | qrcode.react                                       |
| **QR Scanning**   | html5-qrcode / `getUserMedia` API                  |
| **Sensors**       | DeviceMotion API + DeviceOrientation API           |
| **Routing**       | React Router DOM                                   |

---

## Folder Structure ┐( ˘_˘)┌

```text
kpulse/
├── controller/                  # Mobile App
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   └── SocketListener.tsx
│   │   ├── context/
│   │   │   └── Sessioncontext.tsx
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   ├── onboarding/
│   │   │   ├── form/
│   │   │   ├── instructions/
│   │   │   ├── games/
│   │   │   ├── allset/
│   │   │   └── ending/
│   │   ├── routes/
│   │   │   └── router.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── socket.ts
│   │   └── main.tsx
│   ├── .env.development
│   ├── .env.production
│   └── package.json
│
├── screen/                      # Large Screen App
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   └── SocketListener.tsx
│   │   ├── pages/
│   │   │   ├── onboarding/
│   │   │   ├── instructions/
│   │   │   ├── games/
│   │   │   ├── allset/
│   │   │   └── ending/
│   │   ├── routes/
│   │   │   └── router.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── socket.ts
│   │   └── main.tsx
│   ├── .env.development
│   ├── .env.production
│   └── package.json
│
└── server/                      # Backend API & WebSockets
    ├── src/
    │   ├── routes/
    │   │   ├── session.ts
    │   │   ├── patient.ts
    │   │   ├── survey.ts
    │   │   └── results.ts
    │   ├── socket.ts
    │   ├── db.ts
    │   └── main.ts
    ├── package.json
    └── .gitignore
```

---

## Environment Variables ~\_~

You need to configure the following environment variables for each module:

**`controller/.env.development`**

```env
VITE_SOCKET_URL=http://localhost:3001
VITE_API_URL=http://localhost:3001
```

**`controller/.env.production`**

```env
VITE_SOCKET_URL=https://your-server-url.com
VITE_API_URL=https://your-server-url.com
```

**`screen/.env.development`**

```env
VITE_SOCKET_URL=http://localhost:3001
VITE_API_URL=http://localhost:3001
VITE_CONTROLLER_URL=http://localhost:5174
```

**`screen/.env.production`**

```env
VITE_SOCKET_URL=https://your-server-url.com
VITE_API_URL=https://your-server-url.com
VITE_CONTROLLER_URL=https://your-controller-url.com
```

**`server/.env.development`** & **`server/.env.production`**

```env
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
PORT=3001
```

---

## Setup

### Prerequisites

- Node.js 18+
- npm 9+
- A Supabase account

### 1. Clone the repository

```bash
git clone https://github.com/isabelacard/kpulse.git
cd kpulse
```

### 2. Configure Supabase

1. Create a new project on [supabase.com](https://supabase.com)
2. Go to **Settings → API** and copy your `Project URL` and `anon public key`
3. Create your `.env` files for each module following the Environment Variables section

### 3. Install dependencies and run

You can run the entire ecosystem with a single command from the root directory:

```bash
npm install
npm run dev
```

_(Alternatively, you can run `npm install` and `npm run dev` inside each module's folder separately)._

### Default Ports

| Module         | Port   |
| :------------- | :----- |
| **Server**     | `3001` |
| **Screen**     | `5173` |
| **Controller** | `5174` |
