const container = document.getElementById('video-sections');
const mylistKey = 'boushit_mylist';

// ロード時にお気に入りを取得
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

      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${video.id}`;
      iframe.allowFullscreen = true;

      const favBtn = document.createElement('button');
      favBtn.className = 'favorite-btn';
      favBtn.innerHTML = mylist.includes(video.id) ? '★' : '☆';
      if (mylist.includes(video.id)) favBtn.classList.add('active');

      favBtn.addEventListener('click', () => toggleFavorite(video.id, favBtn));

      const caption = document.createElement('div');
      caption.className = 'video-title';
      caption.textContent = video.title;

      card.appendChild(iframe);
      card.appendChild(favBtn);
      card.appendChild(caption);
      row.appendChild(card);
    });

    section.appendChild(titleRow);
    section.appendChild(row);
    container.appendChild(section);
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

renderVideos();