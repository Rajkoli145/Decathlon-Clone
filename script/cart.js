document.addEventListener('DOMContentLoaded', () => {
  const CART_KEY = 'decathlon_cart';

  function getState() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch {
      return [];
    }
  }
  function setState(val) {
    localStorage.setItem(CART_KEY, JSON.stringify(val));
  }

  // Initialize cart state
  let cart = getState();

  // Re-render when localStorage changes
  window.addEventListener('storage', (e) => {
    if (e.key === CART_KEY) {
      cart = getState();
      render();
      updateCartCount();
    }
  });

  const cartContainer = document.getElementById('cartItems');
  const totalPriceEl = document.getElementById('cartTotal');
  const emptyMsgEl = document.getElementById('emptyCartMsg');
  const checkoutBtn = document.getElementById('checkoutBtn');

  function updateCartCount() {
    const countEls = document.querySelectorAll('.cart-count');
    const count = cart.reduce((s, p) => s + p.qty, 0);
    countEls.forEach(el => (el.textContent = count));
  }

  function render() {
    // clear
    cartContainer.innerHTML = '';
    if (cart.length === 0) {
      emptyMsgEl.style.display = 'block';
      checkoutBtn.disabled = true;
      totalPriceEl.textContent = '₹ 0';
      return;
    }
    emptyMsgEl.style.display = 'none';
    checkoutBtn.disabled = false;

    cart.forEach(p => {
      const row = document.createElement('div');
      row.className = 'cart-row';
      row.innerHTML = `
        <div class="cart-prod-info">
          <img src="${p.image}" alt="${p.name}">
          <div>
            <div class="cart-prod-name">${p.name}</div>
            <div class="cart-prod-brand">${p.brand || ''}</div>
            <button class="remove-btn">Remove</button>
          </div>
        </div>
        <div class="cart-qty">
          <button class="qty-dec">-</button>
          <span class="qty-val">${p.qty}</span>
          <button class="qty-inc">+</button>
        </div>
        <div class="cart-price">₹ ${p.price}</div>
        <div class="cart-subtotal">₹ ${p.price * p.qty}</div>`;

      // qty controls
      row.querySelector('.qty-inc').addEventListener('click', () => {
        p.qty += 1;
        persist();
      });
      row.querySelector('.qty-dec').addEventListener('click', () => {
        if (p.qty > 1) {
          p.qty -= 1;
        } else {
          cart = cart.filter(it => it.id !== p.id);
        }
        persist();
      });
      row.querySelector('.remove-btn').addEventListener('click', () => {
        cart = cart.filter(it => it.id !== p.id);
        persist();
      });

      cartContainer.appendChild(row);
    });

    const total = cart.reduce((sum, p) => sum + p.price * p.qty, 0);
    totalPriceEl.textContent = `₹ ${total.toLocaleString()}`;
  }

  function persist() {
    setState(cart);
    updateCartCount();
    render();
  }

  // initial render
  updateCartCount();
  render();

  checkoutBtn.addEventListener('click', () => {
    if (cart.length) alert('Proceeding to checkout (not implemented)');
  });
});
