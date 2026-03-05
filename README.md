# DeepChat 🤖

DeepChat is a modern AI chat interface built with a clean frontend and a serverless backend.
It connects to an LLM using the OpenRouter API and can be deployed easily on Vercel.

---

# ✨ Features

* ChatGPT-style UI
* AI responses via OpenRouter
* Voice input using Speech Recognition API
* Typing indicator
* Clean responsive UI (mobile + desktop)
* Markdown-style formatting
* Serverless backend
* Easy deployment

---

# 📁 Project Structure

```
ChatBot
│
├── api
│   ├── chat.js       # API endpoint
│   └── llm.js        # LLM request logic
│
├── index.html        # Frontend UI
├── logo.png          # App logo
├── package.json      # Dependencies
├── .env              # Environment variables (not committed)
└── README.md
```

---

# ⚙️ Local Setup

## 1 Clone Repository

```
git clone https://github.com/sidhant0802/DeepChat.git
cd ChatBot
```

---

## 2 Install Dependencies

```
npm install
```

Dependencies used:

```
axios
dotenv
```

---

## 3 Create `.env`

Create a file called:

```
.env
```

Add your OpenRouter key:

```
OPENROUTER_API_KEY=your_openrouter_api_key
```

Example:

```
OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxxxxx
```

You can get a key from:

```
https://openrouter.ai
```

---

# 🚀 Running Locally

Since this project uses API routes similar to Vercel, the frontend calls:

```
/api/chat
```

Start a development server such as:

```
npx serve .
```

or

```
python -m http.server
```

Then open:

```
http://localhost:3000
```

---

# 🧠 How It Works

1. User sends message in the UI
2. Frontend sends request

```
POST /api/chat
```

3. `chat.js` receives the message
4. `chat.js` calls `sendMessage()` from `llm.js`
5. `llm.js` sends request to OpenRouter
6. Response is returned to frontend

Flow:

```
index.html
   ↓
/api/chat
   ↓
llm.js
   ↓
OpenRouter API
   ↓
AI Response
```

---

# 🔑 Environment Variables

Required environment variable:

```
OPENROUTER_API_KEY
```

Example `.env`:

```
OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxxxxx
```

Your `.gitignore` should contain:

```
.env
node_modules
```

---

# 🚀 Deployment

This project is designed for **Vercel deployment**.

Steps:

1 Push repository to GitHub

```
git add .
git commit -m "Initial commit"
git push
```

2 Go to Vercel

```
https://vercel.com
```

3 Import the GitHub repository

4 Add Environment Variable

```
OPENROUTER_API_KEY = your_key
```

5 Click **Deploy**

After deployment your API endpoint will be:

```
/api/chat
```

The frontend automatically calls this endpoint.

---

# 🎤 Voice Input

Voice input is implemented using the browser Speech Recognition API.

Supported browsers:

* Chrome
* Edge

---

# 🛠 Tech Stack

Frontend

* HTML
* CSS
* JavaScript

Backend

* Node.js
* Serverless API functions

AI

* OpenRouter

Deployment

* Vercel

---

# 👨‍💻 Author

Sidhant Nirupam

