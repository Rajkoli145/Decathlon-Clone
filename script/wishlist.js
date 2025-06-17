document.addEventListener('DOMContentLoaded', () => {
  const CART_KEY = 'decathlon_cart';
  const WISHLIST_KEY = 'decathlon_wishlist';

  function getState(key, fallback = []) {
    try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch { return fallback; }
  }
  function setState(key, value){ localStorage.setItem(key, JSON.stringify(value)); }

  // Initialize states
  let wishlist = getState(WISHLIST_KEY, []);
  let cart = getState(CART_KEY, []);

  // Re-render when localStorage changes
  window.addEventListener('storage', (e) => {
    if (e.key === WISHLIST_KEY) {
      wishlist = getState(WISHLIST_KEY);
      renderWithProducts(products);
    }
  });

  const wishContainer = document.getElementById('wishItems');
  const emptyMsgEl = document.getElementById('emptyWishMsg');

  function updateWishlistState(){ setState(WISHLIST_KEY, wishlist); }
  function updateCartState(){ setState(CART_KEY, cart); updateCartCountInNav(); }

  function updateCartCountInNav(){
    const countEls = document.querySelectorAll('.cart-count');
    const count = cart.reduce((s,p)=>s+p.qty,0);
    countEls.forEach(el=> el.textContent = count);
  }

  function addToCart(product){
    const idx = cart.findIndex(p=>p.id === product.id);
    if(idx>-1){ cart[idx].qty +=1; } else { cart.push({...product, qty:1}); }
    updateCartState();
  }

  function removeFromWishlist(id){ wishlist = wishlist.filter(pid=>pid!==id); updateWishlistState(); render(); }

  function renderWithProducts(products){
    wishContainer.innerHTML='';
    if(wishlist.length===0){ emptyMsgEl.style.display='block'; return; }
    emptyMsgEl.style.display='none';

    wishlist.forEach(id=>{
      const p = products.find(prod=>prod.id===id);
      if(!p) return; // skip missing
      const row = document.createElement('div');
      row.className='wish-row';
      row.innerHTML = `
        <div class="wish-prod-info">
          <img src="${p.image}" alt="${p.name}">
          <div class="wish-prod-name">${p.name}</div>
        </div>
        <div class="wish-price">₹ ${p.price}</div>
        <div class="wish-actions">
          <button class="primary-btn add-cart-btn">ADD TO CART</button>
          <button class="remove-btn">Remove</button>
        </div>`;

      row.querySelector('.add-cart-btn').addEventListener('click', ()=>{
        addToCart(p);
        removeFromWishlist(p.id);
      });
      row.querySelector('.remove-btn').addEventListener('click', ()=> removeFromWishlist(p.id));

      wishContainer.appendChild(row);
    });
  }

  function render(){
    if(window.PRODUCTS && Array.isArray(window.PRODUCTS)){
      renderWithProducts(window.PRODUCTS);
    } else {
      fetch('data/products.json').then(r=>r.json()).then(renderWithProducts);
    }
  }

  // initial
  updateCartCountInNav();
  render();
});
