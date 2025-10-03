let newsData = [];

// Map kelas ke class CSS
function getClassByKelas(kelas) {
  kelas = kelas.toLowerCase();
  if (kelas.includes("politik")) return "news-politik";
  if (kelas.includes("ekonomi")) return "news-ekonomi";
  if (kelas.includes("sport") || kelas.includes("olahraga")) return "news-sport";
  if (kelas.includes("hiburan")) return "news-hiburan";
  return "news-lainnya";
}

// Load JSON
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    newsData = data;
    renderNews(newsData);
  });

function renderNews(data) {
  const container = document.getElementById('news-container');
  container.innerHTML = '';

  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'news-card ' + getClassByKelas(item.kelas);
    card.innerHTML = `
      <h3>${item.judul}</h3>
      <small>${item.tanggal} | Kelas: ${item.kelas}</small>
      <p>${item.isi}</p>
    `;
    container.appendChild(card);
  });
}

// Search filter
document.getElementById('search').addEventListener('input', function() {
  const query = this.value.toLowerCase();
  const filtered = newsData.filter(item => 
    item.judul.toLowerCase().includes(query) || 
    item.isi.toLowerCase().includes(query) ||
    item.kelas.toLowerCase().includes(query)
  );
  renderNews(filtered);
});
