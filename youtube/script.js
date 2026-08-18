const API_BASE_URL = 'https://2017youtubeapi.netlify.app';

const androidFeed = document.getElementById('androidFeed');
const videoActivity = document.getElementById('videoActivity');
const androidPlayer = document.getElementById('androidPlayer');
const activityVideoTitle = document.getElementById('activityVideoTitle');
const activityChannelTitle = document.getElementById('activityChannelTitle');
const activitySubMeta = document.getElementById('activitySubMeta');
const closeActivityBtn = document.getElementById('closeActivityBtn');
const tabButtons = document.querySelectorAll('.tab-item');
const searchSubmitBtn = document.getElementById('searchSubmitBtn');
const searchInput = document.getElementById('searchInput');
const searchBar = document.getElementById('searchBar');

// Fetch feed from your external Netlify API
async function fetchAndroidFeed(category = 'home', searchQuery = '') {
  androidFeed.innerHTML = '<div class="status-msg">Loading feeds...</div>';

  let url = `${API_BASE_URL}/api/videos?category=${encodeURIComponent(category)}`;
  if (searchQuery.trim() !== '') {
    url += `&q=${encodeURIComponent(searchQuery)}`;
  }

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok || !data || data.length === 0) {
      androidFeed.innerHTML = '<div class="status-msg">No videos found.</div>';
      return;
    }

    renderAndroidFeed(data);
  } catch (err) {
    androidFeed.innerHTML = '<div class="status-msg">Error connecting to Netlify API.</div>';
  }
}

// Render video cards
function renderAndroidFeed(items) {
  androidFeed.innerHTML = items.map(item => {
    const videoId = item.video_id;
    const title = escapeQuotes(item.title);
    const channel = escapeQuotes(item.author);
    const views = item.views || '100K views';
    const thumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    return `
      <div class="card-item" onclick="launchVideo('${videoId}', '${title}', '${channel}', '${views}')">
        <div class="card-thumb-wrapper">
          <img src="${thumb}" alt="${title}">
        </div>
        <div class="card-content">
          <div class="card-avatar"></div>
          <div class="card-info">
            <div class="card-title">${item.title}</div>
            <div class="card-subtext">${item.author} • ${views}</div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Launch Video Overlay
window.launchVideo = function(videoId, title, channel, views) {
  androidPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  activityVideoTitle.innerText = title;
  activityChannelTitle.innerText = channel;
  activitySubMeta.innerText = `${channel} • ${views}`;
  videoActivity.style.display = 'block';
};

// Close Player
if (closeActivityBtn) {
  closeActivityBtn.addEventListener('click', () => {
    videoActivity.style.display = 'none';
    androidPlayer.src = '';
  });
}

// Category Tabs
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const category = btn.textContent.trim().toLowerCase();
    fetchAndroidFeed(category);
  });
});

// Search Trigger
if (searchSubmitBtn) {
  searchSubmitBtn.addEventListener('click', () => {
    if (searchInput.value.trim() !== '') {
      fetchAndroidFeed('home', searchInput.value);
      searchBar.style.display = 'none';
    }
  });
}

function escapeQuotes(str) {
  return (str || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

// Initial Load
fetchAndroidFeed('home');
