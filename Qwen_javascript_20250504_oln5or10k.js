// Dados simulados para preview local
const mockNews = [
  {
    title: "Automação no Campo: Novas Soluções",
    link: "https://exemplo.com/tecnologia",
    pubDate: new Date(),
    category: "tecnologia"
  },
  {
    title: "Preços do Soja Disparam em 2024",
    link: "https://exemplo.com/mercado",
    pubDate: new Date(),
    category: "mercado"
  },
  {
    title: "Demanda por Milho Atinge Nível Recorde",
    link: "https://exemplo.com/commodities",
    pubDate: new Date(),
    category: "commodities"
  },
  {
    title: "Agricultura Regenerativa Reduz Emissões",
    link: "https://exemplo.com/sustentabilidade",
    pubDate: new Date(),
    category: "sustentabilidade"
  }
];

// Renderiza notícias
function renderNews(newsList) {
  const feed = document.getElementById('newsFeed');
  if (!newsList.length) {
    feed.innerHTML = '<p>Nenhuma notícia encontrada.</p>';
    return;
  }

  feed.innerHTML = newsList.map(item => `
    <div class="news-card">
      <h2>${item.title}</h2>
      <small>${item.pubDate.toLocaleDateString()}</small>
      <p><a href="${item.link}" target="_blank">Ler matéria original</a></p>
    </div>
  `).join('');
}

// Filtro por categoria
document.querySelectorAll('.category-filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.category-filter').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const category = button.dataset.category;
    const filtered = category === 'all' ? mockNews : mockNews.filter(n => n.category === category);
    renderNews(filtered);
  });
});

// Simula carregamento inicial
setTimeout(() => {
  renderNews(mockNews);
}, 1000);