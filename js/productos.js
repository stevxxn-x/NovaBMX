function trackView(slug) {
  try {
    const prev = JSON.parse(localStorage.getItem("novabmx:viewed") || "[]");
    const next = [slug, ...prev.filter((item) => item !== slug)].slice(0, 12);
    localStorage.setItem("novabmx:viewed", JSON.stringify(next));
  } catch {}
}

window.trackView = window.trackView || trackView;

function renderCatalogProductCards(grid, products) {
  grid.className = "products-grid";
  grid.innerHTML = products.map(product => `
    <a href="producto-detalle.html?cat=${product.category}&id=${product.id}" class="product-card">
      <img src="${product.imagenes && product.imagenes[0] ? product.imagenes[0] : product.imagen}" alt="${product.name}" style="width: 100%; aspect-ratio: 1; object-fit: cover; display: block;">
      <div class="product-card-body">
        <h3>${product.name}</h3>
        <div class="product-card-footer">
          <span class="product-price">$${product.price.toFixed(2)}</span>
          <span class="text-muted" style="font-size:.75rem">VER →</span>
        </div>
      </div>
    </a>
  `).join("");
}

// Si hay ?cat=xxx muestra productos; si no, lista categorías
document.addEventListener("DOMContentLoaded", () => {
  const cat = getQueryParam("cat");
  const nivel = getQueryParam("nivel");
  const titleEl = document.getElementById("page-title");
  const subtitleEl = document.getElementById("page-subtitle");
  const grid = document.getElementById("main-grid");
  const pageHeader = document.querySelector(".page-header .container");

  if (nivel) {
    const levelNames = {
      entrada: "Gama de Entrada",
      media: "Gama Media",
      alta: "Gama Alta"
    };
    if (!levelNames[nivel]) {
      titleEl.textContent = "Gama no encontrada";
      subtitleEl.textContent = "";
      grid.innerHTML = "";
      return;
    }

    titleEl.textContent = levelNames[nivel];
    subtitleEl.textContent = "";
    const backButton = document.createElement("button");
    backButton.type = "button";
    backButton.className = "catalog-back-btn";
    backButton.textContent = "← Atrás";
    backButton.addEventListener("click", () => window.history.back());
    pageHeader.prepend(backButton);

    const levelProducts = CATEGORIES.flatMap(category =>
      category.products
        .filter(product => product.nivel === nivel)
        .map(product => ({ ...product, category: category.slug }))
    );
    renderCatalogProductCards(grid, levelProducts);
    return;
  }

  if (cat) {
    const c = getCategory(cat);
    if (!c) { grid.innerHTML = "<p>Categoría no encontrada</p>"; return; }
    window.trackView(c.slug);
    if (cat !== "ropa" && pageHeader) {
      const backButton = document.createElement("button");
      backButton.type = "button";
      backButton.className = "catalog-back-btn";
      backButton.textContent = "← Atrás";
      backButton.addEventListener("click", () => window.history.back());
      pageHeader.prepend(backButton);
    }
    titleEl.textContent = c.name;
    subtitleEl.textContent = c.description;
    grid.className = "products-grid";
    const productsToRender = [...c.products].sort((a, b) => {
      const aNew = a.isNew ? 1 : 0;
      const bNew = b.isNew ? 1 : 0;
      if (aNew !== bNew) return bNew - aNew;
      return 0;
    });
    renderCatalogProductCards(grid, productsToRender.map(product => ({ ...product, category: c.slug })));
  } else {
    titleEl.textContent = "Piezas BMX";
    grid.className = "categories-grid";
    grid.innerHTML = CATEGORIES.map(c => `
      <a href="productos.html?cat=${c.slug}" class="category-card">
        ${c.imagen ? `<img src="${c.imagen}" alt="${c.name}" style="width: 100%; aspect-ratio: 1; object-fit: cover; display: block;">` : '<div class="image-placeholder">Imagen</div>'}
        <div class="category-card-body">
          <h3>${c.name}</h3>
          ${c.description ? `<p>${c.description}</p>` : ''}
        </div>
      </a>
    `).join("");
  }
});
