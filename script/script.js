document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements - Consolidated declarations
  const productCards1 = document.querySelectorAll('.product-card'); // All product cards on the main page
  const productSliderSection = document.querySelector('.product-slider-section'); // The main product slider section
  const shopNavItem = document.getElementById('shopNavItem'); // The new Shop nav item

  const bannerImages = [
    'assets/images/newuseroffers.avif',
    'assets/images/banner2.avif',
    'assets/images/banner3.avif'
  ];

  let currentBanner = 0;
  const bannerImg = document.getElementById('bannerImage');
  const leftBtn = document.getElementById('bannerLeft');
  const rightBtn = document.getElementById('bannerRight');

  function showBanner(index) {
    if (index < 0) index = bannerImages.length - 1;
    if (index >= bannerImages.length) index = 0;
    currentBanner = index;
    bannerImg.src = bannerImages[currentBanner];
  }

  leftBtn.addEventListener('click', () => showBanner(currentBanner - 1));
  rightBtn.addEventListener('click', () => showBanner(currentBanner + 1));

  // ===== Generic product slider logic for multiple sections =====
  document.querySelectorAll('.product-slider-section, .product-slider-section1, .product-slider-section2').forEach(section => {
    const container = section.querySelector('.product-slider-container');
    if (!container) return;
    const leftBtn = section.querySelector('.product-arrow.left');
    const rightBtn = section.querySelector('.product-arrow.right');
    const scrollAmount = 320; // width per scroll
    if (leftBtn)
      leftBtn.addEventListener('click', () => {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });
    if (rightBtn)
      rightBtn.addEventListener('click', () => {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });
  });

// Yoga Banner Slider
  const yogaImages = [
    'assets/images/banners/ban1.png',
    'assets/images/banners/ban2.png',
    'assets/images/banners/ban3.png',
    'assets/images/banners/ban4.png',
    'assets/images/banners/ban5.png'
  ];
  let currentYoga = 0;
  const yogaImg = document.getElementById('yogaImage');
  const yogaLeftBtn = document.getElementById('yogaLeft');
  const yogaRightBtn = document.getElementById('yogaRight');
  function showYoga(index) {
    if (index < 0) index = yogaImages.length - 1;
    if (index >= yogaImages.length) index = 0;
    currentYoga = index;
    yogaImg.src = yogaImages[currentYoga];
  }
  yogaLeftBtn.addEventListener('click', () => showYoga(currentYoga - 1));
  yogaRightBtn.addEventListener('click', () => showYoga(currentYoga + 1));
  // Auto-slide every 2 seconds
  setInterval(() => {
    showYoga(currentYoga + 1);
  }, 5000);

  // === Swim Banner Slider (second banner) ===
  const swimImages = [
    'assets/images/banners2/ban1.png',
    'assets/images/banners2/ban2.png',
    'assets/images/banners2/ban3.png',
    'assets/images/banners2/ban4.png',
    'assets/images/banners2/ban5.png'
  ];
  let currentSwim = 0;
  const swimImg = document.getElementById('swimImage');
  const swimLeftBtn = document.getElementById('swimLeft');
  const swimRightBtn = document.getElementById('swimRight');

  function showSwim(index){
    if(index < 0) index = swimImages.length - 1;
    if(index >= swimImages.length) index = 0;
    currentSwim = index;
    if(swimImg) swimImg.src = swimImages[currentSwim];
  }
  if(swimLeftBtn && swimRightBtn && swimImg){
    swimLeftBtn.addEventListener('click', ()=> showSwim(currentSwim - 1));
    swimRightBtn.addEventListener('click', ()=> showSwim(currentSwim + 1));
    setInterval(()=> showSwim(currentSwim + 1), 5000);
  }

  // Sports Slider Arrow Functionality
  const sportsSlider = document.getElementById('sportsSlider');
  const sportsLeft = document.getElementById('sportsLeft');
  const sportsRight = document.getElementById('sportsRight');
  const scrollAmount = 200;
  sportsLeft.addEventListener('click', () => {
    sportsSlider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });
  sportsRight.addEventListener('click', () => {
    sportsSlider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

    const productSlider = document.getElementById('productSlider');
  const productContainer = document.querySelector('.product-slider-container');
  const productLeft = document.getElementById('productLeft');
  const productRight = document.getElementById('productRight');
  const productScrollAmount = 240; // width of card + gap

  if (productContainer && productLeft && productRight) {
    productLeft.addEventListener('click', () => {
      productContainer.scrollBy({ left: -productScrollAmount, behavior: 'smooth' });
    });
    productRight.addEventListener('click', () => {
      productContainer.scrollBy({ left: productScrollAmount, behavior: 'smooth' });
    });
  }

  // Curated Treks Slider Arrow Functionality
  const curatedSlider = document.getElementById('curatedSlider');
  const curatedLeft = document.getElementById('curatedLeft');
  const curatedRight = document.getElementById('curatedRight');
  const curatedScrollAmount = 260; // card width + gap
  if (curatedSlider && curatedLeft && curatedRight) {
    curatedLeft.addEventListener('click', () => {
      curatedSlider.scrollBy({ left: -curatedScrollAmount, behavior: 'smooth' });
    });
    curatedRight.addEventListener('click', () => {
      curatedSlider.scrollBy({ left: curatedScrollAmount, behavior: 'smooth' });
    });
  }

  // Menu functionality
  const menuBtn = document.querySelector('.menu-toggle');

  if (menuBtn) { // Check if menuBtn exists before adding event listener
    menuBtn.addEventListener('click', () => {
      console.log('Menu clicked');
      // Add menu toggle functionality here
    });
  }

  // Category item interactions
  const categoryItems = document.querySelectorAll('.category-item');

  categoryItems.forEach(item => {
    item.addEventListener('click', () => {
      const categoryName = item.querySelector('.category-label').textContent;
      console.log('Category clicked:', categoryName);
      // Add navigation functionality here
    });
  });

  // User action buttons
  const actionBtns = document.querySelectorAll('.nav-item');

  actionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const actionText = btn.querySelector('span').textContent;
      console.log('Action clicked:', actionText);
      // Add specific functionality for each action
    });
  });

  // Coupon card interactions - Ensure elements exist before querying
  const couponCards = document.querySelectorAll('.coupon-card');

  couponCards.forEach(card => {
    card.addEventListener('click', () => {
      const couponCodeElement = card.querySelector('.coupon-code');
      if (couponCodeElement) {
        const couponCode = couponCodeElement.textContent;
        console.log('Coupon copied:', couponCode);
        
        // Copy to clipboard
        if (navigator.clipboard) {
          navigator.clipboard.writeText(couponCode).then(() => {
            // Show feedback
            const originalText = couponCodeElement.textContent;
            couponCodeElement.textContent = 'Copied!';
            setTimeout(() => {
              couponCodeElement.textContent = originalText;
            }, 1500);
          });
        }
      }
    });
  });

  // App download buttons - Ensure elements exist before querying
  const appBtns = document.querySelectorAll('.app-btn');

  appBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const isGooglePlay = btn.classList.contains('google-play');
      console.log('App download clicked:', isGooglePlay ? 'Google Play' : 'App Store');
      // Add actual download links here
    });
  });

  // Delivery location change - Ensure elements exist before querying
  const deliveryInfo = document.querySelector('.delivery-location');

  if (deliveryInfo) { // Check if deliveryInfo exists
    deliveryInfo.addEventListener('click', () => {
      console.log('Change delivery location clicked');
      // Add location change functionality here
    });
  }

  // Add smooth scrolling for better UX
  console.log('Decathlon website loaded successfully!');

  // Add hover effects for better interactivity
  const interactiveElements = document.querySelectorAll('.category-item, .coupon-card, .nav-item');

  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      element.style.transition = 'transform 0.2s ease';
    });
  });

  // Handle window resize for responsive adjustments
  window.addEventListener('resize', () => {
    // Add any responsive adjustments here if needed
    console.log('Window resized to:', window.innerWidth);
  });

  // Lazy loading for images (basic implementation)
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src'); // Remove data-src to prevent re-loading
          observer.unobserve(img);
        }
      }
    });
  });

  images.forEach(img => {
    imageObserver.observe(img);
  });

  // --- NEW STATE & UTILS -------------------------------------------------
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

  function showToast(msg){
    let cont=document.getElementById('toastContainer');
    if(!cont){cont=document.createElement('div');cont.id='toastContainer';document.body.appendChild(cont);}
    const t=document.createElement('div');
    t.className='toast';
    t.textContent=msg;
    cont.appendChild(t);
    setTimeout(()=>{t.style.opacity='0';t.style.transform='translateY(-10px)';setTimeout(()=>t.remove(),300);},2500);
  }

  function addToCart(product) {
    const idx = cart.findIndex(p => p.id === product.id);
    if (idx > -1) {
      cart[idx].qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }
    setState(CART_KEY, cart);
    showToast(`${product.name} added to cart`);
    updateCartCount();
  }

  function toggleWishlist(productId) {
    const i = wishlist.indexOf(productId);
    if (i > -1) {
      wishlist.splice(i, 1);
    } else {
      wishlist.push(productId);
      showToast('Added to wishlist');
    }
  
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(updatedWishlist));
  
    // Update UI
    const wishlistBtn = document.querySelector(`.product-card[data-id="${productId}"] .wishlist-btn`);
    if (wishlistBtn) {
      const icon = wishlistBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-heart-o');
        icon.classList.toggle('fa-heart');
      }
    }
  }

  // Initialize cart count
  updateCartCount();

  // Add event listeners to all product cards
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(card => {
    const productId = card.dataset.id;
    const addToCartBtn = card.querySelector('.add-to-cart-btn');
    const wishlistBtn = card.querySelector('.wishlist-btn');
  
    if (addToCartBtn) {
      addToCartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const product = {
          id: productId,
          title: card.querySelector('.product-title').textContent,
          price: card.querySelector('.product-price').textContent,
          image: card.querySelector('.product-img-badge img').src
        };
        addToCart(product);
      });
    }
  
    if (wishlistBtn) {
      wishlistBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleWishlist(productId);
      });
  
      // Set initial state for wishlist button
      if (wishlist[productId]) {
        const icon = wishlistBtn.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-heart-o');
          icon.classList.add('fa-heart');
        }
      }
    }
  });

  // Product Card Creation
  function createProductCard(p) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.id = p.id;
    card.innerHTML = `
      <div class="product-img-badge">
        <span class="badge new">${p.badge}</span>
        <img src="${p.image}" alt="${p.title}">
        <span class="rating"><i class="fa fa-star"></i> ${p.rating}</span>
        <button class="wishlist-btn"><i class="fa ${wishlist[p.id] ? 'fa-heart' : 'fa-heart-o'}"></i></button>
      </div>
      <div class="product-info">
        <div class="brand">${p.brand}</div>
        <div class="product-title">${p.title}</div>
        <div class="product-price">₹ ${p.price}</div>
        <button class="add-to-cart-btn">${cart[p.id] ? 'ADDED' : 'ADD TO CART'}</button>
      </div>
    `;
  
    return card;
  }

  // --- LOAD & RENDER PRODUCTS ---------------------------------------------
  function initWithProducts(products) {
    renderProductSlider(products);
    setupSearch(products);
  }

  if (window.PRODUCTS && Array.isArray(window.PRODUCTS)) {
    initWithProducts(window.PRODUCTS);
  } else {
    fetch('data/products.json')
      .then(r => r.json())
      .then(initWithProducts)
      .catch(err => console.error('Failed to load product data', err));
  }

    card.querySelector('.add-to-cart-btn').addEventListener('click', e => {
      e.stopPropagation();
      addToCart(p);
      e.currentTarget.textContent = 'ADDED';
      setTimeout(() => (e.currentTarget.textContent = 'ADD TO CART'), 1200);
    });
    return card;
  }

  function renderProductSlider(products) {
    const productSlider = document.getElementById('productSlider');
    if (!productSlider) return;
    productSlider.innerHTML = '';
    products.forEach(p => productSlider.appendChild(createProductCard(p)));
  }


// ---------------- Generic wishlist & add-to-cart handlers ----------------
document.body.addEventListener('click', (e) => {
  const card = e.target.closest('.product-card');
  if (!card) return;

  const productId = card.dataset.id;

  // Handle Wishlist
  const wishlistBtn = e.target.closest('.wishlist-btn');
  if (wishlistBtn) {
    e.preventDefault();
    toggleWishlist(productId);
    // Visual feedback for wishlist action: update icon state based on wishlist
    const icon = wishlistBtn.querySelector('i');
    if (icon) {
      if (wishlist.includes(productId)) {
        icon.classList.remove('fa-heart-o');
        icon.classList.add('fa-heart');
      } else {
        icon.classList.remove('fa-heart');
        icon.classList.add('fa-heart-o');
      }
    }
    return;
  }

  // Handle Add to Cart
  const addCartBtn = e.target.closest('.add-to-cart-btn');
  if (addCartBtn) {
    e.preventDefault();
    const product = {
      id: productId,
      title: card.querySelector('.product-title').textContent,
      price: card.querySelector('.product-price').textContent,
      image: card.querySelector('.product-img-badge img').src
    };
    addToCart(product);

    const originalText = addCartBtn.textContent;
    addCartBtn.textContent = 'ADDED';
    setTimeout(() => (addCartBtn.textContent = originalText), 1200);
    return;
  }
});