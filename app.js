const uploadForm = document.getElementById("uploadForm");
const imageUpload = document.getElementById("imageUpload");
const captionInput = document.getElementById("caption");
const postsContainer = document.getElementById("posts");

function formatNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num;
}

function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

uploadForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const file = imageUpload.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    const likes = randomRange(1200000, 2500000);
    const comments = randomRange(15000, 50000);
    const shares = randomRange(3000, 10000);
    const reposts = randomRange(5, 50);

    const post = document.createElement("div");
    post.classList.add("post");

    let mediaElement = '';
    if (file.type.startsWith("image/")) {
      mediaElement = `<img src="${event.target.result}" alt="Post">`;
    } else if (file.type.startsWith("video/")) {
      mediaElement = `
        <video controls>
          <source src="${event.target.result}" type="${file.type}">
          Tu navegador no soporta el video.
        </video>
      `;
    }

    post.innerHTML = `
      ${mediaElement}
      <div class="reactions-bar">
        <span><i class="fa-regular fa-heart"></i> ${formatNumber(likes)}</span>
        <span><i class="fa-regular fa-comment"></i> ${formatNumber(comments)}</span>
        <span><i class="fa-regular fa-paper-plane"></i> ${formatNumber(shares)}</span>
        <span><i class="fa-solid fa-retweet"></i> ${formatNumber(reposts)}</span>
        <span class="save-icon"><i class="fa-regular fa-bookmark"></i></span>
      </div>
      <p><span class="username">alvarezz_yenni</span> ${captionInput.value} <span class="emoji">❤️</span></p>
      <button class="delete-btn" onclick="this.parentElement.remove()">Eliminar</button>
    `;

    postsContainer.prepend(post);
    uploadForm.reset();
  };

  reader.readAsDataURL(file);
});
