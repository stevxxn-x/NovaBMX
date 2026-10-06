const HISTORY_KEY = "novabmx:viewed";
const MAX_HISTORY = 12;
const HOME_SLIDE_INTERVAL_MS = 5000;
const HOME_SLIDES = [
  "../assets/images/productos/principal1.jpg",
  "../assets/images/productos/principal2.jpg",
  "../assets/images/productos/principal3.jpg"
];

function trackView(slug) {
  try {
    const prev = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
    const next = [slug, ...prev.filter(s => s !== slug)].slice(0, MAX_HISTORY);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
  } catch {}
}

function getAllProducts() {
  const allProducts = [];

  if (typeof CATEGORIES !== "undefined") {
    CATEGORIES.forEach((cat, catIndex) => {
      cat.products.forEach((product, productIndex) => {
        allProducts.push({
          ...product,
          category: cat.slug,
          categoryName: cat.name,
          image: product.imagenes && product.imagenes.length > 0 ? product.imagenes[0] : cat.imagen,
          _order: catIndex * 1000 + productIndex
        });
      });
    });
  }

  if (typeof CLOTHES_CATEGORIES !== "undefined") {
    CLOTHES_CATEGORIES.forEach((cat, catIndex) => {
      cat.products.forEach((product, productIndex) => {
        allProducts.push({
          ...product,
          category: cat.slug,
          categoryName: cat.name,
          image: product.imagenes && product.imagenes.length > 0 ? product.imagenes[0] : cat.imagen,
          _order: 100000 + catIndex * 1000 + productIndex
        });
      });
    });
  }

  return [...allProducts].sort((a, b) => {
    const aNew = a.isNew ? 1 : 0;
    const bNew = b.isNew ? 1 : 0;
    if (aNew !== bNew) return bNew - aNew;
    return (a._order || 0) - (b._order || 0);
  });
}

function buildProductCard(product) {
  return `
    <a href="producto-detalle.html?cat=${product.category}&id=${product.id}" class="product-card">
      <img src="${product.image}" alt="${product.name}">
      <div class="product-card-body">
        <h3>${product.name}</h3>
        <div class="product-card-footer">
          <span class="product-price">$${Number(product.price).toFixed(2)}</span>
          <span class="text-muted">Ver →</span>
        </div>
      </div>
    </a>
  `;
}

function renderFeaturedProducts() {
  const container = document.getElementById("recommendations-grid");
  if (!container) return;

  const parts = getAllProducts().filter(product => product.category !== "ropa");
  const levels = [
    { id: "entrada", name: "Gama de Entrada" },
    { id: "media", name: "Gama Media" },
    { id: "alta", name: "Gama Alta" }
  ];

  container.innerHTML = levels.map(level => {
    const representative = parts.find(product => product.nivel === level.id);
    return `
      <article class="level-block">
        <h3>${level.name}</h3>
        <div class="level-product-slot">
          ${representative ? buildProductCard(representative) : '<p class="text-muted">No hay productos disponibles.</p>'}
        </div>
        <a class="level-all-link" href="productos.html?nivel=${level.id}">Ver todo <span aria-hidden="true">→</span></a>
      </article>
    `;
  }).join("");
}

function renderNewProducts() {
  const container = document.getElementById("new-products-grid");
  if (!container) return;

  const representativeKeys = new Set(
    [...document.querySelectorAll(".level-block .product-card")].map(card => {
      const url = new URL(card.href);
      return `${url.searchParams.get("cat")}:${url.searchParams.get("id")}`;
    })
  );
  const productsToShow = getAllProducts().filter(product =>
    product.isNew && !representativeKeys.has(`${product.category}:${product.id}`)
  );
  container.innerHTML = productsToShow.map(buildProductCard).join("");
  initializeNewProductsCarousel(container);
}

function initializeNewProductsCarousel(container) {
  const previousButton = document.getElementById("new-products-prev");
  const nextButton = document.getElementById("new-products-next");
  if (!previousButton || !nextButton) return;

  const updateButtons = () => {
    const maxScroll = container.scrollWidth - container.clientWidth;
    previousButton.disabled = container.scrollLeft <= 1;
    nextButton.disabled = maxScroll <= 1 || container.scrollLeft >= maxScroll - 1;
  };

  const scrollOneCard = direction => {
    const card = container.querySelector(".product-card");
    if (!card) return;
    const gap = parseFloat(getComputedStyle(container).columnGap) || 0;
    container.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: "smooth"
    });
  };

  previousButton.addEventListener("click", () => scrollOneCard(-1));
  nextButton.addEventListener("click", () => scrollOneCard(1));
  container.addEventListener("scroll", updateButtons, { passive: true });
  container.addEventListener("keydown", event => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    scrollOneCard(event.key === "ArrowRight" ? 1 : -1);
  });
  container.addEventListener("wheel", event => {
    if (!event.shiftKey) return;
    event.preventDefault();
    container.scrollBy({ left: event.deltaY || event.deltaX, behavior: "auto" });
  }, { passive: false });
  window.addEventListener("resize", updateButtons);
  updateButtons();
}

function renderHomeSections() {
  renderFeaturedProducts();
  renderNewProducts();
}

function initializeHomeCarousel() {
  const carousel = document.getElementById("homepage-carousel");
  if (!carousel || HOME_SLIDES.length === 0) return;

  const track = document.createElement("div");
  track.className = "hero-track";
  const slides = [...HOME_SLIDES, HOME_SLIDES[0]];
  track.innerHTML = slides.map((src, index) =>
    `<img src="${src}" alt="Imagen principal ${index % HOME_SLIDES.length + 1}">`
  ).join("");
  carousel.appendChild(track);

  let currentIndex = 0;
  window.setInterval(() => {
    currentIndex += 1;
    track.style.transition = "transform 0.7s ease-in-out";
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    if (currentIndex === HOME_SLIDES.length) {
      track.addEventListener("transitionend", () => {
        track.style.transition = "none";
        track.style.transform = "translateX(0)";
        currentIndex = 0;
      }, { once: true });
    }
  }, HOME_SLIDE_INTERVAL_MS);
}

document.addEventListener("DOMContentLoaded", () => {
  renderHomeSections();
  initializeHomeCarousel();
});
