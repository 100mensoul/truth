const container = document.getElementById('video-sections');
const mylistKey = 'boushit_mylist';

let mylist = JSON.parse(localStorage.getItem(mylistKey) || '[]');

function renderVideos() {
  videoData.forEach(series => {
    const section = document.createElement('section');
    section.className = 'series-section';

    const titleRow = document.createElement('div');
    titleRow.className = 'series-title';

    const title = document.createElement('h2');
    title.textContent = series.seriesTitle;

    const seeAllLink = document.createElement('a');
    seeAllLink.href = `series.html?id=${series.seriesId}`;
    seeAllLink.textContent = 'すべて表示';

    titleRow.appendChild(title);
    titleRow.appendChild(seeAllLink);

    const row = document.createElement('div');
    row.className = 'video-row';

    series.videos.forEach(video => {
      const card = document.createElement('div');
      card.className = 'video-card';

      // サムネイル画像に変更
      const thumbnail = document.createElement('img');
      thumbnail.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
      thumbnail.alt = video.title;
      thumbnail.addEventListener('click', () => openModal(video.id));

      const favBtn = document.createElement('button');
      favBtn.className = 'favorite-btn';
      favBtn.innerHTML = mylist.includes(video.id) ? '★' : '☆';
      if (mylist.includes(video.id)) favBtn.classList.add('active');
      favBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(video.id, favBtn);
      });

      const caption = document.createElement('div');
      caption.className = 'video-title';
      caption.textContent = video.title;

      card.appendChild(thumbnail);
      card.appendChild(favBtn);
      card.appendChild(caption);
      row.appendChild(card);
    });

    section.appendChild(titleRow);
    section.appendChild(row);
    container.appendChild(section);
  });

  setupModal();
}

function toggleFavorite(id, btn) {
  const index = mylist.indexOf(id);
  if (index === -1) {
    mylist.push(id);
    btn.classList.add('active');
    btn.innerHTML = '★';
  } else {
    mylist.splice(index, 1);
    btn.classList.remove('active');
    btn.innerHTML = '☆';
  }
  localStorage.setItem(mylistKey, JSON.stringify(mylist));
}

// ===== モーダル機能 =====
function setupModal() {
  const modal = document.createElement('div');
  modal.id = 'video-modal';
  modal.innerHTML = `
    <span id="modal-close">×</span>
    <iframe id="modal-iframe" src="" allowfullscreen></iframe>
  `;
  document.body.appendChild(modal);

  document.getElementById('modal-close').addEventListener('click', closeModal);
}

function openModal(videoId) {
  const modal = document.getElementById('video-modal');
  const iframe = document.getElementById('modal-iframe');
  iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  modal.style.display = 'flex';
}

function closeModal() {
  const modal = document.getElementById('video-modal');
  const iframe = document.getElementById('modal-iframe');
  iframe.src = '';
  modal.style.display = 'none';
}

renderVideos();