import { initThemeToggle } from './theme.js';

initThemeToggle();

const listEl = document.getElementById('post-list');

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
}

function renderPosts(posts) {
  listEl.innerHTML = '';
  posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))
    .forEach((post) => {
      const card = document.createElement('article');
      card.className = 'post-card';
      card.innerHTML = `
        <h2><a href="post.html?slug=${encodeURIComponent(post.slug)}">${post.title}</a></h2>
        <time datetime="${post.date}">${formatDate(post.date)}</time>
        <p>${post.summary}</p>
      `;
      listEl.appendChild(card);
    });
}

fetch('posts/posts.json')
  .then((res) => {
    if (!res.ok) throw new Error(`posts.json 요청 실패: ${res.status}`);
    return res.json();
  })
  .then(renderPosts)
  .catch((err) => {
    listEl.innerHTML = `<p class="error">글 목록을 불러오지 못했습니다. (${err.message}) 로컬 서버로 열었는지 확인해 주세요.</p>`;
  });
