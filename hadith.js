const DATA = {
  bukhari: {
    name: "Sahih Bukhari",
    chapters: [
      {
        id: "iman",
        name: "Kitab al-Iman",
        hadiths: [
          {
            ar: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ",
            bn: "নিশ্চয়ই সকল কাজ নিয়তের উপর নির্ভরশীল।",
            en: "Actions are judged by intentions."
          }
        ]
      },
      {
        id: "ilm",
        name: "Kitab al-Ilm",
        hadiths: [
          {
            ar: "طَلَبُ الْعِلْمِ فَرِيضَةٌ",
            bn: "জ্ঞান অর্জন করা ফরজ।",
            en: "Seeking knowledge is obligatory."
          }
        ]
      }
    ]
  }
};

const bookSelect = document.getElementById("bookSelect");
const chapterSelect = document.getElementById("chapterSelect");
const hadithList = document.getElementById("hadithList");

function loadBooks() {
  bookSelect.innerHTML = "";
  for (let key in DATA) {
    const opt = document.createElement("option");
    opt.value = key;
    opt.textContent = DATA[key].name;
    bookSelect.appendChild(opt);
  }
  loadChapters();
}

function loadChapters() {
  chapterSelect.innerHTML = "";
  const book = DATA[bookSelect.value];
  book.chapters.forEach(ch => {
    const opt = document.createElement("option");
    opt.value = ch.id;
    opt.textContent = ch.name;
    chapterSelect.appendChild(opt);
  });
  loadHadiths();
}

function loadHadiths() {
  hadithList.innerHTML = "";
  const book = DATA[bookSelect.value];
  const chapter = book.chapters.find(
    c => c.id === chapterSelect.value
  );

  chapter.hadiths.forEach(h => {
    hadithList.innerHTML += `
      <div class="card">
        <div class="arabic">${h.ar}</div>
        <div class="bangla">${h.bn}</div>
        <div class="english">${h.en}</div>
      </div>
    `;
  });
}

bookSelect.onchange = loadChapters;
chapterSelect.onchange = loadHadiths;

loadBooks();
