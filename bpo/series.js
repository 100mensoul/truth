const urlParams = new URLSearchParams(window.location.search);
const seriesId = urlParams.get('id');
const seriesTitleEl = document.getElementById('series-title');
const seriesGrid = document.getElementById('series-grid');
const notfoundMsg = document.getElementById('notfound-message');
const mylistKey = 'boushit_mylist';

let mylist = JSON.parse(localStorage.getItem(mylistKey) || '[]');

// 対象シリーズを探す
const series = videoData.find(item => item.seriesId === seriesId);

if (!series) {
  notfoundMsg.style.display = 'block';
} else {
  seriesTitleEl.textContent = series.seriesTitle;
  renderSeries(series);
}

function renderSeries(series) {
  series.videos.forEach(video => {
    const card = document.createElement('div');
    card.className = 'video-card';

    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${video.id}`;
    iframe.allowFullscreen = true;

    const title = document.createElement('div');
    title.className = 'video-title';
    title.textContent = video.title;

    const favBtn = document.createElement('button');
    favBtn.className = 'favorite-btn';
    favBtn.innerHTML = mylist.includes(video.id) ? '★' : '☆';
    if (mylist.includes(video.id)) favBtn.classList.add('active');

    favBtn.addEventListener('click', () => toggleFavorite(video.id, favBtn));

    card.appendChild(iframe);
    card.appendChild(favBtn);
    card.appendChild(title);
    seriesGrid.appendChild(card);
  });
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