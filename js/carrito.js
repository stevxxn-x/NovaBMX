document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("cart-root");
  const cart = window.NovaBMX && typeof window.NovaBMX.getCart === "function" ? window.NovaBMX.getCart() : [];

  if (!root) return;

  if (cart.length === 0) {
    root.innerHTML = `<div class="cart-empty"><p>Tu carrito está vacío.</p><a href="productos.html" class="btn btn-primary" style="margin-top:1rem">Ver productos</a></div>`;
    return;
  }

  const total = cart.reduce((s, it) => s + it.price, 0);
  root.innerHTML = cart.map((it, i) => `
    <div class="cart-item">
      <div class="image-placeholder">${it.image ? `<img src="${it.image}" alt="${it.name}">` : "IMG"}</div>
      <div class="cart-item-name">${it.name}</div>
      <div class="cart-item-price">$${it.price.toFixed(2)}</div>
      <button class="cart-remove" data-i="${i}">Quitar</button>
    </div>
  `).join("") + `
    <div class="cart-total">Total: <span class="text-primary">$${total.toFixed(2)}</span></div>
    <div class="cart-actions">
      <a href="productos.html" class="btn btn-primary">Seguir comprando</a>
    </div>
  `;

  document.querySelectorAll(".cart-remove").forEach(b => {
    b.addEventListener("click", () => {
      if (window.NovaBMX && typeof window.NovaBMX.removeFromCart === "function") {
        window.NovaBMX.removeFromCart(+b.dataset.i);
      }
      location.reload();
    });
  });
});
