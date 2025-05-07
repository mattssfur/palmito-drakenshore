import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, push, set, onValue, update } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDdZs8TVeEqH2rr33jg18Kn1HcN9iasO3w",
  authDomain: "palmito-v-foro.firebaseapp.com",
  projectId: "palmito-v-foro",
  storageBucket: "palmito-v-foro.firebasestorage.app",
  messagingSenderId: "161112860583",
  appId: "1:161112860583:web:22b308f6c8be51d98a7882",
  measurementId: "G-SV3E1PKJ83"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const commentsRef = ref(db, "comments");

const form = document.getElementById("comment-form");
const nameInput = document.getElementById("name");
const messageInput = document.getElementById("message");
const commentsSection = document.getElementById("comments-section");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const message = messageInput.value.trim();
  if (!name || !message) return;

  const newCommentRef = push(commentsRef);
  await set(newCommentRef, {
    name,
    message,
    replies: []
  });

  form.reset();
});

onValue(commentsRef, (snapshot) => {
  commentsSection.innerHTML = "";
  snapshot.forEach((child) => {
    const commentKey = child.key;
    const data = child.val();

    const card = document.createElement("div");
    card.className = "comment-card";

    const author = document.createElement("div");
    author.className = "author";
    author.textContent = data.name;

    const text = document.createElement("div");
    text.className = "text";
    text.textContent = data.message;

    const repliesDiv = document.createElement("div");
    repliesDiv.className = "replies";
    (data.replies || []).forEach((reply) => {
      const replyEl = document.createElement("div");
      replyEl.className = "reply";

      const replyAuthor = document.createElement("div");
      replyAuthor.className = "reply-author";
      replyAuthor.textContent = reply.name;

      const replyText = document.createElement("div");
      replyText.className = "reply-text";
      replyText.textContent = reply.message;

      replyEl.appendChild(replyAuthor);
      replyEl.appendChild(replyText);
      repliesDiv.appendChild(replyEl);
    });

    const replyBtn = document.createElement("button");
    replyBtn.className = "reply-button";
    replyBtn.textContent = "Responder";

    replyBtn.onclick = () => {
      if (card.querySelector(".reply-form")) return;

      const replyForm = document.createElement("form");
      replyForm.className = "reply-form";

      const replyName = document.createElement("input");
      replyName.type = "text";
      replyName.placeholder = "Tu nombre";
      replyName.required = true;

      const replyText = document.createElement("textarea");
      replyText.placeholder = "Tu respuesta...";
      replyText.required = true;

      const submitBtn = document.createElement("button");
      submitBtn.textContent = "Enviar";

      replyForm.appendChild(replyName);
      replyForm.appendChild(replyText);
      replyForm.appendChild(submitBtn);

      replyForm.onsubmit = async (e) => {
        e.preventDefault();
        const name = replyName.value.trim();
        const message = replyText.value.trim();
        if (!name || !message) return;

        const updatedReplies = data.replies || [];
        updatedReplies.push({ name, message });

        await update(ref(db, `comments/${commentKey}`), {
          replies: updatedReplies
        });
      };

      card.appendChild(replyForm);
    };

    card.appendChild(author);
    card.appendChild(text);
    card.appendChild(replyBtn);
    card.appendChild(repliesDiv);
    commentsSection.appendChild(card);
  });
});
