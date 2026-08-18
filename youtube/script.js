// Sample 2017 styled video catalog
const videos = [
  {
    id: "aqz-KE-bpKQ",
    title: "Big Buck Bunny 3D - Official Open Source Animated Film",
    channel: "Blender Animation",
    views: "11,482,901 views",
    duration: "10:34",
    timeAgo: "6 years ago",
    thumb: "https://img.youtube.com/vi/aqz-KE-bpKQ/mqdefault.jpg"
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Rick Astley - Never Gonna Give You Up (Official Music Video)",
    channel: "RickAstleyVEVO",
    views: "1,204,112,040 views",
    duration: "3:33",
    timeAgo: "10 years ago",
    thumb: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg"
  },
  {
    id: "L_LUpnjgPso",
    title: "Official Red Band Trailer - 2017 Action Release",
    channel: "Movieclips Trailers",
    views: "4,102,880 views",
    duration: "2:24",
    timeAgo: "7 years ago",
    thumb: "https://img.youtube.com/vi/L_LUpnjgPso/mqdefault.jpg"
  },
  {
    id: "tgbNymZ7vqY",
    title: "Muppets Most Wanted - Official Trailer",
    channel: "Disney Movie Trailers",
    views: "892,110 views",
    duration: "2:30",
    timeAgo: "8 years ago",
    thumb: "https://img.youtube.com/vi/tgbNymZ7vqY/mqdefault.jpg"
  }
];

const videoGrid = document.getElementById("videoGrid");
const videoModal = document.getElementById("videoModal");
const modalPlayer = document.getElementById("modalPlayer");
const modalTitle = document.getElementById("modalTitle");
const modalChannel = document.getElementById("modalChannel");
const modalViews = document.getElementById("modalViews");
const closeModal = document.getElementById("closeModal");
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");

// Render Video Cards
function renderVideos(videoList) {
  videoGrid.innerHTML = videoList.map(video => `
    <div class="video-card" onclick="openPlayer('${video.id}')">
      <div class="thumbnail-wrapper">
        <img src="${video.thumb}" alt="${video.title}">
        <span class="duration">${video.duration}</span>
      </div>
      <div class="video-details">
        <div class="video-title">${video.title}</div>
        <div class="channel-name">${video.channel}</div>
        <div class="video-meta">${video.views} • ${video.timeAgo}</div>
      </div>
    </div>
  `).join('');
}

// Open Video Player Modal
function openPlayer(videoId) {
  const video = videos.find(v => v.id === videoId);
  if (!video) return;

  modalPlayer.src = `https://www.youtube.com/embed/${video.id}?autoplay=1`;
  modalTitle.innerText = video.title;
  modalChannel.innerText = video.channel;
  modalViews.innerText = video.views;
  videoModal.style.display = "flex";
}

// Close Modal
closeModal.addEventListener("click", () => {
  videoModal.style.display = "none";
  modalPlayer.src = ""; // Stop audio/video
});

// Sidebar Toggle
menuToggle.addEventListener("click", () => {
  sidebar.style.display = sidebar.style.display === "none" ? "block" : "none";
});

// Initial Render
renderVideos(videos);
