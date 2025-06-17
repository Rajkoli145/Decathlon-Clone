// Initialize sliders
const sliders = {
    'summer-essentials': {
        container: document.querySelector('.product-slider[data-slider="summer-essentials"]'),
        leftArrow: document.querySelector('[data-slider="summer-essentials"][class*="left"]'),
        rightArrow: document.querySelector('[data-slider="summer-essentials"][class*="right"]')
    },
    'most-popular': {
        container: document.querySelector('.product-slider[data-slider="most-popular"]'),
        leftArrow: document.querySelector('[data-slider="most-popular"][class*="left"]'),
        rightArrow: document.querySelector('[data-slider="most-popular"][class*="right"]')
    },
    'new-arrivals': {
        container: document.querySelector('.product-slider[data-slider="new-arrivals"]'),
        leftArrow: document.querySelector('[data-slider="new-arrivals"][class*="left"]'),
        rightArrow: document.querySelector('[data-slider="new-arrivals"][class*="right"]')
    },
    'trending-near-you': {
        container: document.querySelector('.product-slider[data-slider="trending-near-you"]'),
        leftArrow: document.querySelector('[data-slider="trending-near-you"][class*="left"]'),
        rightArrow: document.querySelector('[data-slider="trending-near-you"][class*="right"]')
    },
    'yoga-banner': {
        container: document.querySelector('.yoga-slider-container'),
        leftArrow: document.getElementById('yogaLeft'),
        rightArrow: document.getElementById('yogaRight'),
        images: [
            'assets/images/banners/ban1.png',
            'assets/images/banners/ban2.png',
            'assets/images/banners/ban3.png'
        ],
        currentIndex: 0
    }
};

// Banner slider configuration
const bannerConfig = {
    transitionDuration: 500,
    autoPlay: true,
    autoPlayInterval: 5000
};

// Cart and Wishlist state management
const CART_KEY = 'decathlon_cart';
const WISHLIST_KEY = 'decathlon_wishlist';

function getState(key, fallback = []) {
    try {
        return JSON.parse(localStorage.getItem(key)) || fallback;
    } catch {
        return fallback;
    }
}

function setState(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function updateCartCount() {
    const cart = getState(CART_KEY);
    const count = cart.reduce((sum, p) => sum + p.qty, 0);
    document.querySelectorAll('.cart-count').forEach(el => el.textContent = count);
}

function updateWishlistCount() {
    const wishlist = getState(WISHLIST_KEY);
    const count = wishlist.length;
    document.querySelectorAll('.wishlist-count').forEach(el => el.textContent = count);
}

function showToast(message) {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
        const container = document.createElement('div');
        container.id = 'toastContainer';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.getElementById('toastContainer').appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Product card interactions
function initializeProductCards() {
    document.querySelectorAll('.product-card').forEach(card => {
        const addToCartBtn = card.querySelector('.add-to-cart-btn');
        const wishlistBtn = card.querySelector('.wishlist-btn');
        
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => {
                const product = {
                    id: card.dataset.id,
                    name: card.querySelector('.product-title').textContent,
                    price: parseFloat(card.querySelector('.product-price').textContent.replace('₹', '').trim()),
                    image: card.querySelector('.product-img-badge img').src
                };
                
                const cart = getState(CART_KEY);
                const existingItem = cart.find(item => item.id === product.id);
                
                if (existingItem) {
                    existingItem.qty += 1;
                } else {
                    cart.push({ ...product, qty: 1 });
                }
                
                setState(CART_KEY, cart);
                updateCartCount();
                showToast('Product added to cart!');
            });
        }
        
        if (wishlistBtn) {
            wishlistBtn.addEventListener('click', () => {
                const product = {
                    id: card.dataset.id,
                    name: card.querySelector('.product-title').textContent,
                    price: parseFloat(card.querySelector('.product-price').textContent.replace('₹', '').trim()),
                    image: card.querySelector('.product-img-badge img').src
                };
                
                const wishlist = getState(WISHLIST_KEY);
                const cart = getState(CART_KEY);
                
                const existingItem = wishlist.find(item => item.id === product.id);
                
                if (existingItem) {
                    showToast('Product already in wishlist!');
                    return;
                }
                
                wishlist.push(product);
                setState(WISHLIST_KEY, wishlist);
                updateWishlistCount();
                
                // Remove from cart if exists
                const cartIndex = cart.findIndex(item => item.id === product.id);
                if (cartIndex !== -1) {
                    cart.splice(cartIndex, 1);
                    setState(CART_KEY, cart);
                    updateCartCount();
                }
                
                showToast('Product added to wishlist!');
            });
        }
    });
}

// Initialize banner slider
function initializeBannerSlider() {
    const yogaBanner = sliders['yoga-banner'];
    const yogaImage = document.getElementById('yogaImage');

    // Add click handlers for arrows
    yogaBanner.leftArrow.addEventListener('click', () => {
        showNextBanner(yogaBanner, yogaImage, -1);
    });

    yogaBanner.rightArrow.addEventListener('click', () => {
        showNextBanner(yogaBanner, yogaImage, 1);
    });

    // Start auto-play if enabled
    if (bannerConfig.autoPlay) {
        startAutoPlay(yogaBanner, yogaImage);
    }

    // Add hover handlers for auto-play control
    yogaBanner.container.addEventListener('mouseenter', () => {
        stopAutoPlay(yogaBanner);
    });

    yogaBanner.container.addEventListener('mouseleave', () => {
        if (bannerConfig.autoPlay) {
            startAutoPlay(yogaBanner, yogaImage);
        }
    });
}

// Show next banner
function showNextBanner(banner, imageElement, direction) {
    banner.currentIndex = (banner.currentIndex + direction + banner.images.length) % banner.images.length;
    imageElement.style.transition = `opacity ${bannerConfig.transitionDuration}ms`;
    imageElement.style.opacity = '0';
    
    setTimeout(() => {
        imageElement.src = banner.images[banner.currentIndex];
        setTimeout(() => {
            imageElement.style.opacity = '1';
        }, 100);
    }, bannerConfig.transitionDuration);
}

// Start auto-play
function startAutoPlay(banner, imageElement) {
    banner.interval = setInterval(() => {
        showNextBanner(banner, imageElement, 1);
    }, bannerConfig.autoPlayInterval);
}

// Stop auto-play
function stopAutoPlay(banner) {
    if (banner.interval) {
        clearInterval(banner.interval);
    }
}

// Initialize product slider
function initializeProductSlider(key, slider) {
    if (!slider.container) return;
    
    slider.leftArrow.addEventListener('click', () => {
        moveSlider(key, -1);
    });
    
    slider.rightArrow.addEventListener('click', () => {
        moveSlider(key, 1);
    });
}

// Move product slider
function moveSlider(key, direction) {
    const slider = sliders[key];
    const container = slider.container;
    const cards = container.querySelectorAll('.product-card');
    const cardWidth = cards[0]?.offsetWidth || 0;
    const currentTranslate = parseInt(container.style.transform?.match(/translateX\((-?\d+)px\)/)?.[1] || '0');
    const newTranslate = currentTranslate + (cardWidth + 20) * direction;
    
    container.style.transform = `translateX(${newTranslate}px)`;
}

// Slider scroll configuration
const sliderConfig = {
    itemsToShow: 4,
    scrollAmount: 300,
    maxScroll: 0
};

// Initialize slider scroll
function initializeSliderScroll() {
    Object.values(sliders).forEach(slider => {
        if (slider.container) {
            sliderConfig.maxScroll = slider.container.scrollWidth - slider.container.clientWidth;
            
            // Add scroll event listener
            slider.container.addEventListener('scroll', () => {
                if (slider.container.scrollLeft === 0) {
                    slider.leftArrow.style.opacity = '0.5';
                } else {
                    slider.leftArrow.style.opacity = '1';
                }
                
                if (slider.container.scrollLeft >= sliderConfig.maxScroll) {
                    slider.rightArrow.style.opacity = '0.5';
                } else {
                    slider.rightArrow.style.opacity = '1';
                }
            });

            // Add click handlers for arrows
            if (slider.leftArrow) {
                slider.leftArrow.addEventListener('click', () => {
                    const currentScroll = slider.container.scrollLeft;
                    slider.container.scrollLeft = Math.max(0, currentScroll - sliderConfig.scrollAmount);
                });
            }

            if (slider.rightArrow) {
                slider.rightArrow.addEventListener('click', () => {
                    const currentScroll = slider.container.scrollLeft;
                    slider.container.scrollLeft = Math.min(sliderConfig.maxScroll, currentScroll + sliderConfig.scrollAmount);
                });
            }
        }
    });
}

// Main initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize sliders
    initializeBannerSlider();
    Object.entries(sliders).forEach(([key, slider]) => {
        if (key !== 'yoga-banner') {
            initializeProductSlider(key, slider);
        }
    });

    // Add data-id attributes to product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.setAttribute('data-id', index + 1);
    });

    // Initialize product cards
    initializeProductCards();

    // Initialize slider scroll
    initializeSliderScroll();

    // Initialize counts
    updateCartCount();
    updateWishlistCount();
});

  // Wishlist functionality
  function addToWishlist(product) {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const existingItem = wishlist.find(item => item.id === product.id);

    if (existingItem) {
      // Remove from wishlist if already exists
      const index = wishlist.indexOf(existingItem);
      wishlist.splice(index, 1);
    } else {
      wishlist.push(product);
    }

    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
  }

  // Update cart count in header
  function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
  }

  // Update wishlist count in header
  function updateWishlistCount() {
    const wishlistCount = document.querySelector('.wishlist-count');
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlistCount.textContent = wishlist.length;
  }

  // Initialize counts
  updateCartCount();
  updateWishlistCount();

  document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners to product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
      const addToCartBtn = card.querySelector('.add-to-cart-btn');
      const wishlistBtn = card.querySelector('.wishlist-btn');
      const product = {
        id: card.getAttribute('data-id'),
        name: card.querySelector('.product-title').textContent,
        price: card.querySelector('.product-price').textContent,
        image: card.querySelector('img').src,
        brand: card.querySelector('.brand').textContent
      };
  
      if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => addToCart(product));
      }
  
      if (wishlistBtn) {
        wishlistBtn.addEventListener('click', () => addToWishlist(product));
      }
    });
  });

// Add hover effects for better interactivity
const interactiveElements = document.querySelectorAll('.category-item, .coupon-card, .action-btn');

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

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
  if (e.key === '/') {
    e.preventDefault();
    searchInput.focus();
  }
});

// Lazy loading for images (basic implementation)
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    }
  });
});

images.forEach(img => {
  imageObserver.observe(img);
});