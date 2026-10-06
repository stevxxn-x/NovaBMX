const USER_STORAGE_KEY = "novabmx:users";
const CURRENT_USER_KEY = "novabmx:currentUser";
const GUEST_CART_KEY = "novabmx:cart:guest";

function getStoredUsers() {
  try { return JSON.parse(localStorage.getItem(USER_STORAGE_KEY) || "[]"); }
  catch { return []; }
}

function setStoredUsers(users) {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
}

function getCurrentUser() {
  try {
    const current = localStorage.getItem(CURRENT_USER_KEY);
    return current ? JSON.parse(current) : null;
  } catch {
    return null;
  }
}

function setCurrentUser(user) {
  if (!user) {
    localStorage.removeItem(CURRENT_USER_KEY);
    return;
  }
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

function getUserCart(user) {
  if (!user) return [];
  try {
    return JSON.parse(localStorage.getItem(`novabmx:cart:${user.email}`) || "[]");
  } catch {
    return [];
  }
}

function saveUserCart(user, cart) {
  if (!user) return;
  localStorage.setItem(`novabmx:cart:${user.email}`, JSON.stringify(cart));
}

function getGuestCart() {
  try { return JSON.parse(localStorage.getItem(GUEST_CART_KEY) || "[]"); }
  catch { return []; }
}

function getCart() {
  const user = getCurrentUser();
  return user ? getUserCart(user) : getGuestCart();
}

function addToCart(item) {
  const user = getCurrentUser();
  const cart = getCart();
  cart.push(item);
  if (user) saveUserCart(user, cart);
  else localStorage.setItem(GUEST_CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new CustomEvent("novabmx:cart-updated"));
  return true;
}

function removeFromCart(index) {
  const user = getCurrentUser();
  const cart = getCart();
  cart.splice(index, 1);
  if (user) saveUserCart(user, cart);
  else localStorage.setItem(GUEST_CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new CustomEvent("novabmx:cart-updated"));
  return cart;
}

window.NovaBMX = {
  getCurrentUser,
  setCurrentUser,
  getStoredUsers,
  setStoredUsers,
  getCart,
  addToCart,
  removeFromCart,
  getUserCart,
  saveUserCart
};

function buildCatalogEntries() {
  const entries = [];
  if (typeof CATEGORIES !== "undefined") {
    CATEGORIES.forEach(cat => {
      cat.products.forEach(product => {
        entries.push({
          name: product.name,
          category: cat.name,
          categorySlug: cat.slug,
          productId: product.id,
          price: product.price,
          imagen: product.imagenes && product.imagenes[0] ? product.imagenes[0] : cat.imagen
        });
      });
    });
  }
  if (typeof CLOTHES_CATEGORIES !== "undefined") {
    CLOTHES_CATEGORIES.forEach(cat => {
      cat.products.forEach(product => {
        entries.push({
          name: product.name,
          category: cat.name,
          categorySlug: cat.slug,
          productId: product.id,
          price: product.price,
          imagen: product.imagenes && product.imagenes[0] ? product.imagenes[0] : cat.imagen
        });
      });
    });
  }
  return entries;
}

document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navbar-links a").forEach(a => {
    if (a.getAttribute("href").endsWith(path)) a.classList.add("active");
  });

  const navbarInner = document.querySelector(".navbar-inner");
  if (navbarInner) {
    const hasCustomHeader = navbarInner.querySelector(".navbar-brand") || navbarInner.querySelector(".navbar-links") || navbarInner.querySelector(".navbar-toolbar");

    if (!hasCustomHeader) {
      const toolbar = document.createElement("div");
      toolbar.className = "navbar-toolbar";
      toolbar.innerHTML = `
        <a href="index.html" class="navbar-brand" aria-label="NovaBMX, página principal">
          <img src="../assets/images/productos/logo_marca.png" alt="NovaBMX">
        </a>
      `;
      navbarInner.appendChild(toolbar);

      const secondary = document.createElement("div");
      secondary.className = "navbar-secondary";
      secondary.innerHTML = `
        <nav class="navbar-links">
          <a href="index.html">Inicio</a>
          <a href="productos.html">Partes</a>
          <a href="productos.html?cat=ropa">Ropa</a>
          <a href="contacto.html">Contacto</a>
        </nav>
        <div class="navbar-actions">
          <button id="account-btn" class="navbar-action-btn" aria-label="Mi Cuenta" title="Mi Cuenta">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
          <a href="carrito.html" class="navbar-action-btn cart-link" aria-label="Carrito" title="Carrito">
            <span class="cart-count" aria-live="polite"></span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="20" r="1"></circle>
              <circle cx="19" cy="20" r="1"></circle>
              <path d="M1 1h4l2.68 10.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L20 6H6"></path>
            </svg>
          </a>
        </div>
      `;
      navbarInner.appendChild(secondary);
    }
  }

  const cartLink = document.querySelector(".cart-link");
  const cartCount = cartLink && cartLink.querySelector(".cart-count");
  function updateCartCount() {
    if (!cartCount) return;
    const count = getCart().length;
    cartCount.textContent = count ? String(count) : "";
    cartCount.classList.toggle("visible", count > 0);
    cartLink.setAttribute("aria-label", count
      ? `Carrito, ${count} ${count === 1 ? "producto" : "productos"}`
      : "Carrito");
  }
  updateCartCount();
  window.addEventListener("novabmx:cart-updated", updateCartCount);
  window.addEventListener("storage", updateCartCount);


  const accountBtn = document.getElementById("account-btn");
  const accountModal = document.createElement("div");
  accountModal.id = "account-modal";
  accountModal.className = "account-modal hidden";
  accountModal.innerHTML = `
    <div class="account-modal-content">
      <button class="account-close-btn" aria-label="Cerrar">×</button>
      <div class="account-mode-toggle">
        <button type="button" class="account-mode-btn active" data-mode="login">Iniciar sesión</button>
        <button type="button" class="account-mode-btn" data-mode="signup">Crear cuenta</button>
      </div>
      <form class="account-form" id="account-form">
        <input type="text" id="account-name" class="hidden" name="name" placeholder="Tu nombre">
        <input type="email" name="email" placeholder="Correo electrónico" required>
        <input type="password" name="password" placeholder="Contraseña" required>
        <input type="password" id="account-confirm" class="hidden" name="confirmPassword" placeholder="Confirmar contraseña">
        <button class="btn btn-primary" type="submit">Continuar</button>
      </form>
      <p class="account-feedback" id="account-feedback"></p>
    </div>
  `;
  document.body.appendChild(accountModal);

  function renderAccountState() {
    if (accountBtn) {
      accountBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      `;
    }
    updateCartCount();
  }

  function openAccountModal() {
    accountModal.classList.remove("hidden");
    const feedback = document.getElementById("account-feedback");
    if (feedback) feedback.textContent = "";
  }

  if (accountBtn) {
    accountBtn.addEventListener("click", () => {
      const user = getCurrentUser();
      if (user) {
        const logout = confirm(`¿Deseas cerrar sesión, ${user.name}?`);
        if (logout) {
          setCurrentUser(null);
          renderAccountState();
        }
        return;
      }
      openAccountModal();
    });
  }

  accountModal.querySelector(".account-close-btn").addEventListener("click", () => accountModal.classList.add("hidden"));
  accountModal.addEventListener("click", (event) => {
    if (event.target === accountModal) accountModal.classList.add("hidden");
  });

  const modeButtons = accountModal.querySelectorAll(".account-mode-btn");
  const nameInput = accountModal.querySelector("#account-name");
  const confirmInput = accountModal.querySelector("#account-confirm");
  const form = accountModal.querySelector("#account-form");
  const feedback = accountModal.querySelector("#account-feedback");

  modeButtons.forEach(button => {
    button.addEventListener("click", () => {
      modeButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      const mode = button.dataset.mode;
      if (mode === "signup") {
        nameInput.classList.remove("hidden");
        confirmInput.classList.remove("hidden");
        form.querySelector("button").textContent = "Crear cuenta";
      } else {
        nameInput.classList.add("hidden");
        confirmInput.classList.add("hidden");
        form.querySelector("button").textContent = "Continuar";
      }
      if (feedback) feedback.textContent = "";
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const email = String(data.get("email") || "").trim().toLowerCase();
    const password = String(data.get("password") || "");
    const mode = accountModal.querySelector(".account-mode-btn.active").dataset.mode;

    if (!email || !password) {
      if (feedback) feedback.textContent = "Completa los campos para continuar.";
      return;
    }

    const users = getStoredUsers();

    if (mode === "signup") {
      const name = String(data.get("name") || "").trim();
      const confirmPassword = String(data.get("confirmPassword") || "");
      if (!name) {
        if (feedback) feedback.textContent = "Ingresa tu nombre para crear la cuenta.";
        return;
      }
      if (password !== confirmPassword) {
        if (feedback) feedback.textContent = "Las contraseñas no coinciden.";
        return;
      }
      if (users.some(user => user.email === email)) {
        if (feedback) feedback.textContent = "Ya existe una cuenta con ese correo.";
        return;
      }
      const newUser = { name, email, password };
      users.push(newUser);
      setStoredUsers(users);
      setCurrentUser(newUser);
      renderAccountState();
      accountModal.classList.add("hidden");
      return;
    }

    const user = users.find(item => item.email === email && item.password === password);
    if (!user) {
      if (feedback) feedback.textContent = "Correo o contraseña incorrectos.";
      return;
    }

    setCurrentUser(user);
    renderAccountState();
    accountModal.classList.add("hidden");
  });

  renderAccountState();
});
