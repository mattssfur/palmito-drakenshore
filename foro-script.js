document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('comment-form');
    const nameInput = document.getElementById('name');
    const messageInput = document.getElementById('message');
    const commentsSection = document.getElementById('comments-section');
  
    let comments = [];
  
    const loadComments = () => {
      const stored = localStorage.getItem('forumComments');
      comments = stored ? JSON.parse(stored) : [];
    };
  
    const saveComments = () => {
      localStorage.setItem('forumComments', JSON.stringify(comments));
    };
  
    const renderComments = () => {
      commentsSection.innerHTML = '';
      comments.forEach((comment, index) => {
        const card = document.createElement('div');
        card.className = 'comment-card';
  
        const author = document.createElement('div');
        author.className = 'author';
        author.textContent = comment.name;
  
        const text = document.createElement('div');
        text.className = 'text';
        text.textContent = comment.message;
  
        const replyBtn = document.createElement('button');
        replyBtn.className = 'reply-button';
        replyBtn.textContent = 'Responder';
  
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-button';
        deleteBtn.textContent = 'Eliminar';
  
        deleteBtn.addEventListener('click', () => {
          if (confirm('¿Eliminar este comentario y sus respuestas?')) {
            comments.splice(index, 1);
            saveComments();
            renderComments();
          }
        });
  
        const repliesDiv = document.createElement('div');
        repliesDiv.className = 'replies';
        (comment.replies || []).forEach(reply => {
          const replyEl = document.createElement('div');
          replyEl.className = 'reply';
  
          const replyAuthor = document.createElement('div');
          replyAuthor.className = 'reply-author';
          replyAuthor.textContent = reply.name;
  
          const replyText = document.createElement('div');
          replyText.className = 'reply-text';
          replyText.textContent = reply.message;
  
          replyEl.appendChild(replyAuthor);
          replyEl.appendChild(replyText);
          repliesDiv.appendChild(replyEl);
        });
  
        replyBtn.addEventListener('click', () => {
          if (card.querySelector('.reply-form')) return;
  
          const replyForm = document.createElement('form');
          replyForm.className = 'reply-form';
  
          const replyName = document.createElement('input');
          replyName.type = 'text';
          replyName.placeholder = 'Tu nombre';
          replyName.required = true;
  
          const textarea = document.createElement('textarea');
          textarea.rows = 2;
          textarea.placeholder = 'Tu respuesta...';
          textarea.required = true;
  
          const submitBtn = document.createElement('button');
          submitBtn.textContent = 'Enviar';
  
          replyForm.appendChild(replyName);
          replyForm.appendChild(textarea);
          replyForm.appendChild(submitBtn);
  
          replyForm.addEventListener('submit', e => {
            e.preventDefault();
            const name = replyName.value.trim();
            const message = textarea.value.trim();
            if (!name || !message) return;
  
            if (!comments[index].replies) comments[index].replies = [];
            comments[index].replies.push({ name, message });
            saveComments();
            renderComments();
          });
  
          card.appendChild(replyForm);
        });
  
        card.appendChild(author);
        card.appendChild(text);
        card.appendChild(replyBtn);
        card.appendChild(deleteBtn);
        card.appendChild(repliesDiv);
  
        commentsSection.appendChild(card);
      });
    };
  
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = nameInput.value.trim();
      const message = messageInput.value.trim();
      if (!name || !message) return;
  
      comments.push({ name, message, replies: [] });
      saveComments();
      form.reset();
      renderComments();
    });
  
    loadComments();
    renderComments();
  });
  