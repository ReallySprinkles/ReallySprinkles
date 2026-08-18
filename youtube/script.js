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

// Search Bar Toggle
if (searchToggleBtn) {
  searchToggleBtn.addEventListener('click', () => {
    searchBar.style.display = searchBar.style.display === 'flex' ? 'none' : 'flex';
  });
}

// Fetch Static JSON API from GitHub
async function fetchAndroidFeed(category = 'home', searchQuery = '') {
  androidFeed.innerHTML = '<div class="status-msg">Loading feeds...</div>';

  // Map category tabs to static JSON endpoints
  let endpoint = './api/videos.json';
  if (category === 'trending') {
    endpoint = './api/trending.json';
  } else if (category === 'subscriptions') {
    endpoint = './api/subscriptions.json';
  }

  try {
    const res = await fetch(endpoint);
    let data = await res.json();

    // Perform search filtering on the client side
    if (searchQuery.trim() !== '') {
      data = data.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (!data || data.length === 0) {
      androidFeed.innerHTML = '<div class="status-msg">No videos found.</div>';
      return;
    }

    renderAndroidFeed(data);
  } catch (err) {
    androidFeed.innerHTML = '<div class="status-msg">Error loading feed. Make sure api/videos.json exists.</div>';
  }
}

// Render Video Cards
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

// Play Selected Video
window.launchVideo = function(videoId, title, channel, views) {
  androidPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  activityVideoTitle.innerText = title;
  activityChannelTitle.innerText = channel;
  activitySubMeta.innerText = `${channel} • ${views}`;
  videoActivity.style.display = 'block';
};

// Close Overlay Player
if (closeActivityBtn) {
  closeActivityBtn.addEventListener('click', () => {
    videoActivity.style.display = 'none';
    androidPlayer.src = '';
  });
}

// Category Tabs Selection
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
