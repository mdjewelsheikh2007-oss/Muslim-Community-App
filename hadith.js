const chapterSelect = document.getElementById("chapterSelect");
const hadithList = document.getElementById("hadithList");
const langSelect = document.getElementById("langSelect");

/*
 আমরা এখানে PUBLIC + TRUSTED API ব্যবহার করছি
 Arabic একদম নিখুঁত
 Bangla + English সাপোর্ট করে
*/

const API_BASE = "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions";

// Sahih Bukhari editions
const EDITIONS = {
    ar: "ara-bukhari",
    en: "eng-bukhari",
    bn: "ben-bukhari"
};

// Load chapter list
async function loadChapters() {
    const res = await fetch(`${API_BASE}/eng-bukhari.json`);
    const data = await res.json();

    chapterSelect.innerHTML = "";
    data.metadata.sections.forEach(sec => {
        const opt = document.createElement("option");
        opt.value = sec.section;
        opt.textContent = sec.sectionTitle;
        chapterSelect.appendChild(opt);
    });

    loadHadiths();
}

// Load hadiths
async function loadHadiths() {
    const lang = langSelect.value;
    const chapter = chapterSelect.value;

    hadithList.innerHTML = "Loading hadiths...";

    const res = await fetch(`${API_BASE}/${EDITIONS[lang]}.json`);
    const data = await res.json();

    const filtered = data.hadiths.filter(h => h.section === chapter);

    hadithList.innerHTML = "";

    filtered.forEach(h => {
        const div = document.createElement("div");
        div.className = "hadith";

        div.innerHTML = `
            <p class="hadith-text">${h.text}</p>
            <hr>
        `;
        hadithList.appendChild(div);
    });
}

chapterSelect.onchange = loadHadiths;
langSelect.onchange = loadHadiths;

loadChapters();
