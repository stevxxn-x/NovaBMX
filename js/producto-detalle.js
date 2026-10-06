document.addEventListener("DOMContentLoaded", () => {
  const cat = getQueryParam("cat");
  const id = getQueryParam("id");
  const c = getCategory(cat);
  const p = getProduct(cat, id);
  const root = document.getElementById("product-root");
  if (!c || !p) { root.innerHTML = "<p style='padding:4rem;text-align:center'>Producto no encontrado</p>"; return; }

  document.title = `${p.name} — NovaBMX`;
  document.getElementById("breadcrumb").innerHTML = `
    <button id="back-btn" class="back-btn" aria-label="Retroceder">← Atrás</button>
    <a href="productos.html">Catálogo</a> / 
    <a href="productos.html?cat=${c.slug}">${c.name}</a>
  `;

  const images = p.imagenes && p.imagenes.length > 0 ? p.imagenes : [p.imagen];
  
  root.innerHTML = `
    <div>
      <div class="image-placeholder product-main-image" id="main-img">
        <img src="${images[0]}" alt="${p.name}" id="main-product-image">
        <button class="image-zoom-trigger" id="image-zoom-trigger" type="button" aria-label="Ampliar imagen" title="Ampliar imagen">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="10.8" cy="10.8" r="6.8"></circle>
            <path d="m16 16 5 5M10.8 7.8v6M7.8 10.8h6"></path>
          </svg>
        </button>
        ${images.length > 1 ? `
          <button class="gallery-arrow gallery-prev" type="button" aria-label="Imagen anterior">&#10094;</button>
          <button class="gallery-arrow gallery-next" type="button" aria-label="Imagen siguiente">&#10095;</button>
        ` : ""}
      </div>
      ${images.length > 1 ? `
        <div class="thumbnails" id="product-thumbnails" aria-label="Otras imágenes del producto">
          ${images.map((img, i) => `
            <button class="thumb image-placeholder ${i === 0 ? "active" : ""}" type="button" data-i="${i}" aria-label="Ver imagen ${i + 1}" style="background-image: url('${img}');">
            </button>
          `).join("")}
        </div>
      ` : ""}
    </div>
    <div class="product-info">
      <span class="category">${c.name}</span>
      <h1>${p.name}</h1>
      <div class="price">$${p.price.toFixed(2)}</div>
      <p class="description">${p.description}</p>
      <div class="product-actions">
        <button class="btn btn-primary" id="add-cart">Añadir al carrito</button>
        <button class="btn btn-outline">Comprar ya</button>
      </div>
    </div>
  `;

  let currentImageIndex = 0;
  const mainImage = document.getElementById("main-product-image");
  const thumbnails = document.getElementById("product-thumbnails");
  const imageModal = document.createElement("div");
  imageModal.className = "product-image-modal hidden";
  imageModal.innerHTML = `
    <div class="product-image-backdrop"></div>
    <div class="product-image-dialog" role="dialog" aria-modal="true" aria-label="Imagen ampliada del producto">
      <button class="product-image-close" type="button" aria-label="Cerrar imagen">×</button>
      <button class="product-image-zoom" type="button" aria-label="Acercar imagen" title="Acercar imagen">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 5 5M10.8 7.8v6M7.8 10.8h6"></path></svg>
      </button>
      <img class="product-image-full" src="" alt="">
    </div>
  `;
  document.body.appendChild(imageModal);
  const modalImage = imageModal.querySelector(".product-image-full");
  const zoomButton = imageModal.querySelector(".product-image-zoom");
  const imageDialog = imageModal.querySelector(".product-image-dialog");
  const closeImageModal = () => imageModal.classList.add("hidden");

  function updateZoomOrigin(event) {
    const bounds = imageDialog.getBoundingClientRect();
    const x = Math.min(100, Math.max(0, ((event.clientX - bounds.left) / imageDialog.clientWidth) * 100));
    const y = Math.min(100, Math.max(0, ((event.clientY - bounds.top) / imageDialog.clientHeight) * 100));
    modalImage.style.transformOrigin = `${x}% ${y}%`;
  }

  function toggleZoom(event) {
    const zoomed = !modalImage.classList.contains("zoomed");
    if (zoomed && event) updateZoomOrigin(event);
    modalImage.classList.toggle("zoomed", zoomed);
    zoomButton.setAttribute("aria-label", zoomed ? "Alejar imagen" : "Acercar imagen");
    zoomButton.title = zoomed ? "Alejar imagen" : "Acercar imagen";
    if (!zoomed) modalImage.style.transformOrigin = "50% 50%";
  }

  function openImageModal() {
    modalImage.src = mainImage.src;
    modalImage.alt = mainImage.alt;
    modalImage.classList.remove("zoomed");
    modalImage.style.transformOrigin = "50% 50%";
    zoomButton.setAttribute("aria-label", "Acercar imagen");
    zoomButton.title = "Acercar imagen";
    imageModal.classList.remove("hidden");
  }

  document.getElementById("image-zoom-trigger").addEventListener("click", openImageModal);
  modalImage.addEventListener("click", toggleZoom);
  zoomButton.addEventListener("click", () => toggleZoom());
  imageDialog.addEventListener("pointermove", event => {
    if (modalImage.classList.contains("zoomed")) updateZoomOrigin(event);
  });
  imageModal.querySelector(".product-image-close").addEventListener("click", closeImageModal);
  imageModal.querySelector(".product-image-backdrop").addEventListener("click", closeImageModal);
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeImageModal();
  });

  function showImage(index) {
    currentImageIndex = (index + images.length) % images.length;
    mainImage.src = images[currentImageIndex];
    if (!thumbnails) return;
    thumbnails.querySelectorAll(".thumb").forEach((thumb, thumbIndex) => {
      thumb.classList.toggle("active", thumbIndex === currentImageIndex);
    });
  }

  if (images.length > 1) {
    document.querySelector(".gallery-prev").addEventListener("click", () => showImage(currentImageIndex - 1));
    document.querySelector(".gallery-next").addEventListener("click", () => showImage(currentImageIndex + 1));
    mainImage.addEventListener("click", () => {
      thumbnails.classList.add("visible");
      openImageModal();
    });
    thumbnails.querySelectorAll(".thumb").forEach((thumb) => {
      thumb.addEventListener("click", () => showImage(Number(thumb.dataset.i)));
    });
  } else {
    mainImage.addEventListener("click", openImageModal);
  }

  // Botón retroceder
  document.getElementById("back-btn").addEventListener("click", () => {
    window.history.back();
  });

  // Añadir al carrito (por usuario) y tracking
  document.getElementById("add-cart").addEventListener("click", () => {
    if (typeof window.trackView === "function") window.trackView(c.slug);
    const added = window.NovaBMX && typeof window.NovaBMX.addToCart === "function"
      ? window.NovaBMX.addToCart({
        cat: c.slug,
        id: p.id,
        name: p.name,
        price: p.price,
        image: images[0]
      })
      : false;

    if (!added) {
      alert("No se pudo añadir el producto al carrito.");
      return;
    }

    window.location.href = "carrito.html";
  });
});
