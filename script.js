let currentLang = localStorage.getItem("lang") || "fr";
const translations = {
  fr: {
    general: "Général",
    technology: "Technologie",
    sports: "Sport",
    entertainment: "Divertissement",
    health: "Santé",
    searchPlaceholder: "Rechercher une actualité...",
    search: "Rechercher",
    read: "Lire l'article",
    noResult: "Aucun résultat trouvé.",
    favoris: "⭐ Favoris",
    addFav: "Ajouté aux favoris",
    removeFav: "Supprimé des favoris"
  },
  ar: {
    general: "عام",
    technology: "تكنولوجيا",
    sports: "رياضة",
    entertainment: "ترفيه",
    health: "صحة",
    searchPlaceholder: "ابحث عن خبر...",
    search: "بحث",
    read: "اقرأ المقال",
    noResult: "لا توجد نتائج.",
    favoris: "⭐ المفضلة",
    addFav: "تمت الإضافة للمفضلة",
    removeFav: "تمت الإزالة من المفضلة"
  }
};

let allArticles = [];

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);
  document.getElementById("searchInput").placeholder = translations[lang].searchPlaceholder;
  getNews();
}

function speakText(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = currentLang === 'ar' ? 'ar-SA' : 'fr-FR';
  speechSynthesis.speak(utterance);
}

function setupSpeech() {
  const cards = document.querySelectorAll('.news-card');
  cards.forEach(card => {
    const title = card.querySelector('h3');
    title.addEventListener('click', () => speakText(title.textContent));
  });
}

function searchArticles() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filteredArticles = allArticles.filter(article =>
    article.title.toLowerCase().includes(query) || article.description.toLowerCase().includes(query)
  );
  displayArticles(filteredArticles);
}

function displayArticles(articles) {
  const newsContainer = document.getElementById("news");
  newsContainer.innerHTML = '';

  if (articles.length === 0) {
    newsContainer.innerHTML = `<p style="text-align:center;">${translations[currentLang].noResult}</p>`;
    return;
  }

  articles.forEach(article => {
    const card = document.createElement("div");
    card.className = "news-card";
    card.innerHTML = `
      <img src="${article.urlToImage || ''}" alt="image">
      <h3>${article.title}</h3>
      <p><a href="${article.url}" target="_blank">${translations[currentLang].read}</a></p>
      <button onclick='toggleFavori(${JSON.stringify(article)})'>⭐ ${translations[currentLang].addFav}</button>
    `;
    newsContainer.appendChild(card);
  });

  setupSpeech();
}

function getNews() {
    fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=7e8cb4b746a84b469a5053e5e3a3ab94')
      .then(response => response.json())
      .then(data => {
        // Traite les données et affiche les actualités
        console.log(data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des actualités:', error);
      });
  }
  
  getNews();

