const API_KEY = 'YOUR_YOUTUBE_API_KEY'; // Replace with a YouTube Data API v3 Key

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

// Search Toggle
searchToggleBtn.addEventListener('click', () => {
  searchBar.style.display = searchBar.style.display === 'flex' ? 'none' : 'flex';
});

// Fetch videos using YouTube API
async function fetchAndroidFeed(query) {
  androidFeed.innerHTML = '<div class="status-msg">Loading feeds...</div>';

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q=${encodeURIComponent(query)}&type=video&key=${API_KEY}`
    );
    const data = await res.json();

    if (!data.items || data.items.length === 0) {
      androidFeed.innerHTML = '<div class="status-msg">No videos found or invalid API key.</div>';
      return;
    }

    renderAndroidFeed(data.items);
  } catch (err) {
    androidFeed.innerHTML = '<div class="status-msg">Error loading YouTube feed.</div>';
  }
}

// Render Material Cards
function renderAndroidFeed(items) {
  androidFeed.innerHTML = items.map(item => `
    <div class="card-item" onclick="launchVideo('${item.id.videoId}', '${escapeQuotes(item.snippet.title)}', '${escapeQuotes(item.snippet.channelTitle)}')">
      <div class="card-thumb-wrapper">
        <img src="${item.snippet.thumbnails.high.url}" alt="${item.snippet.title}">
      </div>
      <div class="card-content">
        <div class="card-avatar"></div>
        <div class="card-info">
          <div class="card-title">${item.snippet.title}</div>
          <div class="card-subtext">${item.snippet.channelTitle} • ${new Date(item.snippet.publishedAt).toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  `).join('');
}

// Open Video Activity Screen
function launchVideo(videoId, title, channel) {
  androidPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  activityVideoTitle.innerText = title;
  activityChannelTitle.innerText = channel;
  activitySubMeta.innerText = `${channel} • 100K views`;
  videoActivity.style.display = 'block';
}

// Close Activity Screen
closeActivityBtn.addEventListener('click', () => {
  videoActivity.style.display = 'none';
  androidPlayer.src = '';
});

// Tab Switcher
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    fetchAndroidFeed(btn.dataset.query);
  });
});

// Search execution
searchSubmitBtn.addEventListener('click', () => {
  if (searchInput.value.trim() !== '') {
    fetchAndroidFeed(searchInput.value);
    searchBar.style.display = 'none';
  }
});

function escapeQuotes(str) {
  return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

// Initial feed load
fetchAndroidFeed('2017 android youtube');
