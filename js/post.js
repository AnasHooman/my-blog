import { initThemeToggle } from './theme.js';

initThemeToggle();

const contentEl = document.getElementById('post-content');

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
}

function renderNotFound() {
  contentEl.innerHTML = `
    <h1>글을 찾을 수 없습니다</h1>
    <p><a href="index.html">글 목록으로 돌아가기</a></p>
  `;
}

async function main() {
  const slug = new URLSearchParams(location.search).get('slug');
  if (!slug) {
    renderNotFound();
    return;
  }

  const listRes = await fetch('posts/posts.json');
  if (!listRes.ok) {
    renderNotFound();
    return;
  }
  const posts = await listRes.json();
  const meta = posts.find((p) => p.slug === slug);
  if (!meta) {
    renderNotFound();
    return;
  }

  const mdRes = await fetch(`posts/${meta.slug}.md`);
  if (!mdRes.ok) {
    renderNotFound();
    return;
  }
  const markdown = await mdRes.text();

  document.title = meta.title;
  // marked.parse의 결과를 innerHTML로 직접 주입한다. posts/*.md는 사용자 입력이 아니라
  // 저장소에 직접 작성하는 콘텐츠이므로 별도 sanitize 없이 신뢰한다.
  contentEl.innerHTML = `
    <h1>${meta.title}</h1>
    <time datetime="${meta.date}">${formatDate(meta.date)}</time>
    <div class="post-body">${marked.parse(markdown)}</div>
  `;
}

main().catch(renderNotFound);
