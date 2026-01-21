fetch("https://api.alquran.cloud/v1/surah")
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById("surahList");
    if (!list) return;

    data.data.forEach(surah => {
      const li = document.createElement("li");
      li.textContent = surah.number + ". " + surah.englishName;
      li.onclick = () => loadSurah(surah.number, surah.englishName);
      list.appendChild(li);
    });
  });

function loadSurah(number, name) {
  document.getElementById("ayahSection").style.display = "block";
  document.getElementById("surahTitle").innerText = "Surah " + name;
  document.getElementById("ayahList").innerHTML = "Loading...";

  fetch(`https://api.alquran.cloud/v1/surah/${number}/editions/quran-uthmani,bn.bengali,en.asad`)
    .then(res => res.json())
    .then(data => {
      const arabic = data.data[0].ayahs;
      const bangla = data.data[1].ayahs;
      const english = data.data[2].ayahs;

      let html = "";
      for (let i = 0; i < arabic.length; i++) {
        html += `
          <div class="ayah">
            <p class="arabic">${arabic[i].text}</p>
            <p class="bangla">${bangla[i].text}</p>
            <p class="english">${english[i].text}</p>
          </div>
        `;
      }
      document.getElementById("ayahList").innerHTML = html;
    });
}
