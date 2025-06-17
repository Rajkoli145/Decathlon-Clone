# Decathlon – Sports Products Online Store (Static Website)

A clean, responsive ecommerce front-end inspired by Decathlon India. Built with vanilla **HTML**, **CSS**, and **JavaScript**, it showcases modern UI patterns such as carousels, modals and dynamic wish-list / cart handling, but requires **no backend** to view or demo.

## 🌟 Key Features

• **Responsive Navigation Bar** – collapsible “All Sports” menu, search field with live modal, user / cart / wishlist icons.

• **Interactive Search Modal** – trending & recent searches, dynamic collections and top-product placeholders.

• **Hero Banners & Category Grid** – swipeable hero images and quick-access sport categories.

• **Product Sliders** – reusable horizontal carousels (Summer Essentials, Most Popular, New Arrivals, etc.) with rating badges, discounts and wishlist buttons.

• **Wishlist & Cart Logic** – simple JS modules (`wishlist.js`, `cart.js`) that persist data in **localStorage** so the UI retains state across page refreshes.

• **Fully Responsive Design** – mobile-first layout scales up gracefully to desktops.

## 📂 Project Structure

```
Decathlon/
├── index.html            # Main page
├── css/
│   └── style.css         # Core styles (FontAwesome CDN for icons)
├── script/
│   ├── main.js           # Banner & slider logic, search modal, misc.
│   ├── cart.js           # Cart counter, add/remove logic (localStorage)
│   └── wishlist.js       # Wishlist logic (localStorage)
├── assets/
│   └── images/           # Logos, category icons, banners, sample products
└── README.md             # <–– You are here
```

## 🚀 Getting Started

Because it is a pure static site, you can preview it in two quick ways:

1. **Open directly** – double-click `index.html` (works in all modern browsers).
2. **Serve locally** (recommended for CORS-safe asset loading):
   ```bash
   # Using VSCode Live Server, Python, or any static server
   npx serve .
   # or
   python -m http.server 8000
   ```
   Then visit `http://localhost:8000` in your browser.

No extra build steps or dependencies are required.

## 🛠️ Customisation

• Add / swap images in `assets/images/`.

• Edit or duplicate product `<div class="product-card"> … </div>` blocks in `index.html` to showcase different items.

• Tweak colours, fonts and breakpoints inside `css/style.css`.

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'feat: add my feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

## 📄 License

This project is released under the MIT License – see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by Raj koli
