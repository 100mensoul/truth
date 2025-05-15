const mylistContainer = document.getElementById('mylist-grid');
const emptyMessage = document.getElementById('empty-message');
const mylistKey = 'boushit_mylist';

let mylist = JSON.parse(localStorage.getItem(mylistKey) || '[]');

if (mylist.length === 0) {
  emptyMessage.style.display = 'block';
} else {
  renderMylist();
}

function renderMylist() {
  const flatVideos = videoData.flatMap(series => series.videos.map(video => ({
    ...video,
    seriesTitle: series.seriesTitle
  })));

  const myVideos = flatVideos.filter(video => mylist.includes(video.id));

  myVideos.forEach(video => {
    const card = document.createElement('div');
    card.className = 'video-card';

    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${video.id}`;
    iframe.allowFullscreen = true;

    const title = document.createElement('div');
    title.className = 'video-title';
    title.textContent = video.title;

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.innerHTML = '×';
    removeBtn.title = 'マイリストから削除';
    removeBtn.addEventListener('click', () => {
      removeFromMylist(video.id);
      card.remove();
      if (mylist.length === 0) {
        emptyMessage.style.display = 'block';
      }
    });

    card.appendChild(iframe);
    card.appendChild(removeBtn);
    card.appendChild(title);
    mylistContainer.appendChild(card);
  });
}

function removeFromMylist(id) {
  mylist = mylist.filter(item => item !== id);
  localStorage.setItem(mylistKey, JSON.stringify(mylist));
}