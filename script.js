
// // this calls your server which then calls llm.js
const SERVER_URL = "/api/chat";


// const state = { loading: false, serverOk: false };


// document.getElementById('init-ts').textContent = getTime();


// async function checkServer() {
//   try {
//     const res = await fetch('/health', { method: 'GET' });
//     if (res.ok) {
//       setServerOk(true);
//     } else {
//       setServerOk(false);
//     }
//   } catch {
//     // Server not running at all
//     setServerOk(false);
//   }
// }

// function setServerOk(ok) {
//   state.serverOk = ok;
//   document.getElementById('server-banner').classList.toggle('show', !ok);
//   document.getElementById('conn-badge').classList.toggle('show', ok);
//   document.getElementById('conn-status').textContent = ok
//     ? 'Online · AI Assistant'
//     : 'Server offline';
// //   document.getElementById('live-dot-el') // leave live dot always green visually
// }


// this calls your server which then calls llm.js
// const SERVER_URL = "/api/chat";

const state = { loading: false };

document.getElementById('init-ts').textContent = getTime();

const msgEl = document.getElementById('msg');

msgEl.addEventListener('input', () => {
  msgEl.style.height = 'auto';
  msgEl.style.height = Math.min(msgEl.scrollHeight, 110) + 'px';
});

msgEl.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMsg();
  }
});

function useChip(el) {
  msgEl.value = el.textContent;
  msgEl.dispatchEvent(new Event('input'));
  msgEl.focus();
}

function getTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

function scrollBottom() {
  const c = document.getElementById('msgs');
  c.scrollTo({ top: c.scrollHeight, behavior: 'smooth' });
}

const BOT_AV = `<div class="av-bot">
  <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"
       stroke-linecap="round" stroke-linejoin="round" width="15" height="15">
    <rect x="3" y="11" width="18" height="10" rx="3"/>
    <path d="M9 11V8a3 3 0 0 1 6 0v3"/>
    <circle cx="9" cy="16" r="1" fill="white" stroke="none"/>
    <circle cx="15" cy="16" r="1" fill="white" stroke="none"/>
  </svg>
</div>`;

function appendBot(text) {
  const c = document.getElementById('msgs');
  const row = document.createElement('div');
  row.className = 'row bot';
  row.innerHTML = `${BOT_AV}
    <div class="bubble-wrap">
      <div class="bubble">${text}</div>
      <div class="ts">${getTime()}</div>
    </div>`;
  c.appendChild(row);
  scrollBottom();
}

function appendUser(text) {
  const c = document.getElementById('msgs');
  const row = document.createElement('div');
  row.className = 'row user';
  row.innerHTML = `<div class="bubble-wrap">
      <div class="bubble">${text}</div>
      <div class="ts">${getTime()}</div>
    </div>`;
  c.appendChild(row);
  scrollBottom();
}

function showTyping() {
  const c = document.getElementById('msgs');
  const row = document.createElement('div');
  row.className = 'typing-row';
  row.id = 'typing-row';
  row.innerHTML = `${BOT_AV}
    <div class="typing-bub"><span></span><span></span><span></span></div>`;
  c.appendChild(row);
}

function hideTyping() {
  const r = document.getElementById('typing-row');
  if (r) r.remove();
}

// const SpeechRecognition =
//   window.SpeechRecognition || window.webkitSpeechRecognition;

// let recognition = null;
// let isRecording = false;

async function sendMsg() {
  const text = msgEl.value.trim();
  if (!text || state.loading) return;

  msgEl.value = '';
  msgEl.style.height = 'auto';

  state.loading = true;

  appendUser(text);
  showTyping();

  try {

    const res = await fetch(SERVER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text })
    });

    const data = await res.json();

    hideTyping();
    appendBot(data.reply);

  } catch (err) {

    hideTyping();
    appendBot("⚠️ Server connection error.");

  } finally {

    state.loading = false;
    msgEl.focus();

  }
}


const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = null;
let isRecording = false;

if (SpeechRecognition) {

  recognition = new SpeechRecognition();

  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";

  let finalTranscript = "";

  recognition.onstart = () => {

    isRecording = true;
    finalTranscript = "";

    document.getElementById("mic-btn").classList.add("recording");
    document.getElementById("voice-bar").classList.add("active");

  };

  recognition.onresult = (event) => {

    let interim = "";

    for (let i = event.resultIndex; i < event.results.length; i++) {

      const text = event.results[i][0].transcript;

      if (event.results[i].isFinal) {
        finalTranscript += text + " ";
      } else {
        interim += text;
      }

    }

    msgEl.value = (finalTranscript + interim).trim();
    msgEl.dispatchEvent(new Event("input"));

  };


  
  // recognition.onstart = () => {
  //   isRecording = true;
  //   finalTranscript = '';
  //   document.getElementById('mic-btn').classList.add('recording');
  //   document.getElementById('voice-bar').classList.add('active');
  // };


  recognition.onend = () => {

    isRecording = false;

    document.getElementById("mic-btn").classList.remove("recording");
    document.getElementById("voice-bar").classList.remove("active");

    if (msgEl.value.trim()) {
      showToast("Voice captured — press Send ✓");
    }

  };

  recognition.onerror = (e) => {

    isRecording = false;

    document.getElementById("mic-btn").classList.remove("recording");
    document.getElementById("voice-bar").classList.remove("active");

    showToast("Voice error: " + e.error);

  };

} else {

  document.getElementById("mic-btn").style.opacity = ".4";
  document.getElementById("mic-btn").title = "Voice not supported";

}

function toggleMic() {

  if (!recognition) {
    showToast("Use Chrome for voice input 🎤");
    return;
  }

  if (isRecording) {
    recognition.stop();
  } else {
    recognition.start();
  }

}

function stopMic() {

  if (recognition && isRecording) {
    recognition.stop();
  }

}
