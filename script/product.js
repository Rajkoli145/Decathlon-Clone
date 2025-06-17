document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'), 10);
  const detailContainer = document.getElementById('productDetail');

  if (!id) {
    detailContainer.textContent = 'Product not found.';
    return;
  }

  const CART_KEY = 'decathlon_cart';
  const WISHLIST_KEY = 'decathlon_wishlist';

  function getState(key) {
    try {
      return JSON.parse(localStorage.getItem(key)) || [];
    } catch {
      return [];
    }
  }
  function setState(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  const cart = getState(CART_KEY);
  const wishlist = getState(WISHLIST_KEY);

  function updateCartCount() {
    const countEls = document.querySelectorAll('.cart-count');
    countEls.forEach(el => (el.textContent = cart.reduce((sum, p) => sum + p.qty, 0)));
  }
  updateCartCount();

  function addToCart(product) {
    const idx = cart.findIndex(p => p.id === product.id);
    if (idx > -1) {
      cart[idx].qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }
    setState(CART_KEY, cart);
    updateCartCount();
  }
  function toggleWishlist(pid) {
    const i = wishlist.indexOf(pid);
    if (i > -1) {
      wishlist.splice(i, 1);
    } else {
      wishlist.push(pid);
    }
    setState(WISHLIST_KEY, wishlist);
    return wishlist.includes(pid);
  }

  function handleProducts(products) {
    const product = products.find(p => p.id === id);
    if (!product) {
      detailContainer.textContent = 'Product not found.';
      return;
    }
    render(product);
  }

  if (window.PRODUCTS) {
    handleProducts(window.PRODUCTS);
  } else {
    fetch('data/products.json')
      .then(r => r.json())
      .then(handleProducts)
      .catch(err => {
        console.error(err);
        detailContainer.textContent = 'Failed to load product.';
      });
  }

  function render(p) {
    // create dummy gallery array if product has only single image
    const gallery = p.images && p.images.length ? p.images : Array(4).fill(p.image);

    const galleryThumbs = gallery
      .map((img, i) => `<img src="${img}" class="gallery-thumb${i === 0 ? ' active' : ''}" data-idx="${i}">`)
      .join('');

    const sizes = p.sizes || ['XS', 'S', 'M', 'L', 'XL'];
    const sizeButtons = sizes
      .map(s => `<button class="size-btn" data-size="${s}">${s}</button>`)
      .join('');

    detailContainer.innerHTML = `
      <div class="detail-wrapper">
        <div class="gallery-column">
          <div class="thumbs-col">${galleryThumbs}</div>
          <div class="main-image-wrapper"><img id="mainGalleryImg" src="${gallery[0]}" alt="${p.name}"></div>
        </div>
        <div class="detail-info">
          <h2>${p.name}</h2>
          <div class="brand">${p.brand}</div>
          <div class="rating"><i class="fa fa-star"></i> ${p.rating.toFixed(1)} | ${p.ratingCount}</div>
          <div class="price-block">
            <span class="current-price">₹ ${p.price}</span>
            ${p.originalPrice ? `<span class="original-price">₹ ${p.originalPrice}</span>` : ''}
            ${p.discountText ? `<span class="discount-text-badge">${p.discountText}</span>` : ''}
          </div>
          <div class="size-section">
            <h4>Select Size</h4>
            <div class="size-grid">${sizeButtons}</div>
          </div>
          <div class="actions">
            <button id="addCartBtn" class="primary-btn">ADD TO CART</button>
            <button id="wishBtn" class="secondary-btn"><i class="fa fa-heart${wishlist.includes(p.id) ? '' : '-o'}"></i></button>
          </div>
        </div>
      </div>`;

    // gallery interactions
    document.querySelectorAll('.gallery-thumb').forEach(el => {
      el.addEventListener('click', () => {
        document.getElementById('mainGalleryImg').src = el.src;
        document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
        el.classList.add('active');
      });
    });

    // size selection
    document.querySelectorAll('.size-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });

    document.getElementById('addCartBtn').addEventListener('click', () => {
      addToCart(p);
      alert('Added to cart');
    });
    document.getElementById('wishBtn').addEventListener('click', e => {
      const isFav = toggleWishlist(p.id);
      e.currentTarget.querySelector('i').className = isFav ? 'fa fa-heart' : 'fa fa-heart-o';
    });
  }
});
