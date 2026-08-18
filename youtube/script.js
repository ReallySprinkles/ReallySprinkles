// Using a free, public YouTube proxy instance (No API key or credit card needed)
const INVIDIOUS_INSTANCE = 'https://invidious.nerdvpn.de';

const androidFeed = document.getElementById('androidFeed');
const videoActivity = document.getElementById('videoActivity');
const androidPlayer = document.getElementById('androidPlayer');
const activityVideoTitle = document.getElementById('activityVideoTitle');
const activityChannelTitle = document.getElementById('activityChannelTitle');
const activitySubMeta = document.getElementById('activitySubMeta');

const searchToggleBtn = document.getElementById('searchToggleBtn');
const searchBar = document.getElementById('searchBar');
const searchInput = document.getElementById('searchInput');
const searchSubmitBtn = document.getElementById('searchSubmitBtn');
const closeActivityBtn = document.getElementById('closeActivityBtn');
const tabButtons = document.querySelectorAll('.tab-item');

// Toggle Search Bar
if (searchToggleBtn) {
  searchToggleBtn.addEventListener('click', () => {
    searchBar.style.display = searchBar.style.display === 'flex' ? 'none' : 'flex';
  });
}

// Fetch real YouTube videos via free public proxy
async function fetchAndroidFeed(query = '2017 hits') {
  androidFeed.innerHTML = '<div class="status-msg">Loading feeds...</div>';

  try {
    const res = await fetch(`${INVIDIOUS_INSTANCE}/api/v1/search?q=${encodeURIComponent(query)}&type=video`);
    const data = await res.json();

    if (!data || data.length === 0) {
      androidFeed.innerHTML = '<div class="status-msg">No videos found. Try another search.</div>';
      return;
    }

    renderAndroidFeed(data);
  } catch (err) {
    // If the proxy instance is down, fallback to secondary public proxy
    fetchBackupFeed(query);
  }
}

// Backup public API fetch
async function fetchBackupFeed(query) {
  try {
    const res = await fetch(`https://vid.puffyan.us/api/v1/search?q=${encodeURIComponent(query)}&type=video`);
    const data = await res.json();
    renderAndroidFeed(data);
  } catch (e) {
    androidFeed.innerHTML = '<div class="status-msg">Failed to load feed. Check internet connection.</div>';
  }
}

// Render Material Cards
function renderAndroidFeed(items) {
  androidFeed.innerHTML = items.map(item => {
    const videoId = item.videoId;
    const title = escapeQuotes(item.title);
    const channel = escapeQuotes(item.author);
    const views = item.viewCount ? (item.viewCount / 1000).toFixed(0) + 'K views' : 'YouTube Video';
    const thumb = item.videoThumbnails && item.videoThumbnails.length > 0 
      ? item.videoThumbnails[0].url 
      : `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    return `
      <div class="card-item" onclick="launchVideo('${videoId}', '${title}', '${channel}', '${views}')">
        <div class="card-thumb-wrapper">
          <img src="${thumb}" alt="${item.title}">
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

// Open Native Video Activity Screen
function launchVideo(videoId, title, channel, views) {
  // Uses YouTube's standard embed player
  androidPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  activityVideoTitle.innerText = title;
  activityChannelTitle.innerText = channel;
  activitySubMeta.innerText = `${channel} • ${views}`;
  videoActivity.style.display = 'block';
}

// Close Video Screen
if (closeActivityBtn) {
  closeActivityBtn.addEventListener('click', () => {
    videoActivity.style.display = 'none';
    androidPlayer.src = '';
  });
}

// Top Tab Click Handlers
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const query = btn.dataset.query || '2017 android';
    fetchAndroidFeed(query);
  });
});

// Search execution
if (searchSubmitBtn) {
  searchSubmitBtn.addEventListener('click', () => {
    if (searchInput.value.trim() !== '') {
      fetchAndroidFeed(searchInput.value);
      searchBar.style.display = 'none';
    }
  });
}

function escapeQuotes(str) {
  return (str || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

// Initial feed load
fetchAndroidFeed('2017 nostalgic videos');
