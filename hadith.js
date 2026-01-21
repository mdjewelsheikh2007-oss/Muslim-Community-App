let start = 1;
let limit = 20;
let loading = false;

const hadithList = document.getElementById("hadithList");
const loadMoreBtn = document.getElementById("loadMore");

function loadHadith() {
  if (loading) return;
  loading = true;

  const end = start + limit - 1;
  const url = `https://api.hadith.gading.dev/books/bukhari?range=${start}-${end}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      data.data.hadiths.forEach(h => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
          <div class="arabic">${h.arab}</div>
          <div class="english">${h.id}</div>
        `;
        hadithList.appendChild(div);
      });

      start += limit;
      loading = false;
    })
    .catch(err => {
      console.error(err);
      loading = false;
    });
}

loadMoreBtn.addEventListener("click", loadHadith);

// Initial load
loadHadith();
