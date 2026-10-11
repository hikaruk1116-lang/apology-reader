document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('greek-text');
  const dictContent = document.getElementById('dict-content');

  // JSONデータの読み込み
  fetch('apology_17a.json')
    .then(response => response.json())
    .then(data => {
      data.forEach((item) => {
        const span = document.createElement('span');
        span.classList.add('word');
        span.textContent = item.surface + ' ';

        span.addEventListener('mouseenter', () => updateDictionary(item, span));
        span.addEventListener('click', () => updateDictionary(item, span));

        container.appendChild(span);
      });
    })
    .catch(error => {
      console.error('Error loading JSON:', error);
      dictContent.innerHTML = `<p style="color:red;">データの読み込みに失敗しました（Live Serverで開いていますか？）</p>`;
    });

  function updateDictionary(item, activeElement) {
    document.querySelectorAll('.word').forEach(w => w.classList.remove('active'));
    activeElement.classList.add('active');

    const pageBadge = item.shumpu_page 
      ? `<span class="shumpu-badge">📖 春風 p. ${item.shumpu_page}</span>`
      : `<span class="shumpu-badge" style="background-color:#ccc;">📖 春風 -</span>`;

    dictContent.innerHTML = `
      <div class="dict-header">
        <span class="lemma">${item.lemma}</span>
        <span class="pos">[${item.pos}]</span>
      </div>
      <div class="badge-container">
        ${pageBadge}
      </div>
      <div class="meaning">${item.meaning}</div>
    `;
  }
});