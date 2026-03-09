# Takaful Market

Luxury accessories app for watches, belts, and wallets. Browse products, add to cart, and place orders via email.

---

## App Features (Complete List)

### Screens
- **Home** – Hero banner, features (Fast Delivery, Secure Payment, 24/7 Support, Easy Returns), Exclusive Collections (Classic Timepieces, Leather Essentials, Luxury Wallets), Bestsellers, About section (“Crafted with Passion, Worn with Pride”), New Arrivals, Brand Promise (Premium Quality, Secure Shipping, Happy Customers), CTA (“Shop Collection Now”), footer (TM TakafulMarket). Header: logo + cart icon with badge. Floating Contact button opens contact form.
- **Shop** – Category filter (All, Watches, Belts, Wallets), product count, product grid. Header: “Shop” + cart. Tap product opens product detail modal.
- **About** – About Us hero, Our Story, Our Mission with stats (5,000+ Happy Customers, 74+ Products, 4.8★ Rating), Our Values (Brand Promises), Testimonials carousel, Why Choose Us (4 items), footer.
- **Cart** – Modal screen. Cart list with image, name, price, discount badge, quantity +/- , remove. Summary: items total, Delivery FREE, total. Proceed to Checkout (opens email app; cart clears when user returns to app), Clear (with confirmation modal). Empty state: “Your Cart is Empty” + Start Shopping. Cart is scrollable; contents persist on device.

### Modals
- **Contact form** (from Home FAB) – Name*, Email, Phone*, Message*. Send opens device email app with pre-filled message to contact email. No data sent to any server from the app.
- **Product detail** (from Shop) – Product name, price (Rs.), description, features list. Buttons: Cancel, Add to Cart.
- **Clear cart** (from Cart header) – “Clear Cart” / “Are you sure you want to clear all items?” with Cancel and Clear.

### User Actions
- Browse products on Home (Bestsellers, New Arrivals) and Shop (by category).
- View collections on Home; tap opens Shop tab.
- View product details in Shop (modal with description and features).
- Add to cart from Home product cards, Shop grid, or Shop product modal.
- View and edit cart (change quantity, remove item, clear cart).
- Proceed to Checkout: opens device email app with order details (items, quantities, total) pre-filled; user sends email to place order.
- Contact Us: open contact form, fill fields, send via device email app.
- Dark/Light theme follows system setting.

### Data & Storage
- **Cart** – Stored only on device in app document directory (`takafulmarket_cart.json`). Contains product IDs and quantities. No account or server storage.
- **Contact & orders** – Not stored in the app. Submitted via device email app (mailto) to the business email.

### Permissions
- No runtime permissions requested. Email is handled by the device mail app. Cart file is in app-private storage.

### Third-Party / External
- **Images** – Product and collection images loaded from URLs (e.g. Unsplash). No analytics or tracking in the app.
- **Navigation** – React Navigation (tabs, stack).
- **UI** – Expo (Image, LinearGradient, Linking, FileSystem, etc.), Ionicons.

### Technical Details (for store/listing)
- **Minimum SDK** – Android (from Expo prebuild; typically API 24+).
- **Orientation** – Portrait.
- **Tablet** – Supported (iOS). Android follows device.
- **Internet** – Required only to load product/collection images. App works for cart and contact without internet except images may not load.

---

## Play Store Listing

### Short description (max 80 characters)
Takaful Market – luxury watches, belts & wallets. Browse, cart, order by email.

### Full description (for Play Store)
Takaful Market brings you premium watches, belts, and wallets in one app.

• Browse by category: Watches, Belts, Wallets  
• View Bestsellers and New Arrivals on the home screen  
• Read product details, features, and prices  
• Add items to cart; cart is saved on your device  
• Place orders by email: tap “Proceed to Checkout” and send the pre-filled email  
• Contact us anytime via the in-app contact form (opens your email app)  
• Dark and light theme support  

No account required. No in-app payments. Orders and enquiries are handled by email.

---

## Play Store Questionnaire – Quick Answers

| Question / Section | Answer |
|--------------------|--------|
| **App name** | Takaful Market |
| **Package name** | com.takafulmarket.app |
| **Category** | Shopping (or Lifestyle) |
| **Contains ads?** | No |
| **In-app purchases?** | No |
| **Target age group** | All ages (or 13+ if you prefer; app has no restricted content) |
| **Data collection** | No personal data collected by the app. Cart is stored only on device. Contact and orders go via user’s email app. |
| **Data shared with third parties?** | No. No analytics, no tracking, no backend that collects user data. |
| **Permissions** | None required. No location, contacts, etc. |
| **Account required?** | No |
| **Internet** | Used only to load product/collection images. |
| **Content rating** | General / Everyone (no violence, no mature content). |
| **Contact email** | bilalmuhammad987868@gmail.com |
| **App version** | 1.0.0 |
| **Developer name** | (Your name or company – fill in Play Console) |
| **Privacy policy URL** | Host this README (e.g. GitHub Pages) or copy the “Privacy Policy (Full)” section to a webpage and paste that URL in Play Console. |
| **Data safety – Data collection?** | No. App does not collect or share user data. Cart is stored only on device; no data transmitted to servers. |
| **Data safety – Data encrypted in transit?** | N/A (no user data sent). Image URLs loaded over HTTPS. |
| **App access – Login required?** | No. All features available without account. |
| **Cart after checkout** | When user taps “Proceed to Checkout,” email app opens. When user returns to the app, cart is cleared automatically. |

---

## Privacy (for Play Store & users)

**Summary (suitable for store listing / short privacy notice):**

- Takaful Market does not collect, store, or transmit your personal data to any server.
- Cart data (product IDs and quantities) is stored only on your device and can be cleared by clearing the cart or uninstalling the app.
- When you use “Proceed to Checkout” or “Contact Us,” the app opens your device’s email app. You choose what to send; we do not receive or store that data inside the app.
- Product and collection images are loaded from the internet; no user data is sent for that.
- We do not use analytics, advertising, or third-party tracking.

**Data stored on device:**
- Cart contents (product IDs and quantities) in a file in the app’s private storage. Deleted when you clear the cart or uninstall the app.

**Data not collected:**
- No names, emails, phone numbers, or addresses stored in the app.  
- No usage or analytics data.  
- No data sold or shared with third parties.

For orders and support, contact: **bilalmuhammad987868@gmail.com**.

---

## Privacy Policy (Full – for Play Store URL)

**Last updated:** March 2025 | **App:** Takaful Market (Android) | **Package:** com.takafulmarket.app | **Contact:** bilalmuhammad987868@gmail.com

**1. Overview**  
Takaful Market ("we", "our", "the app") is a shopping app for luxury watches, belts, and wallets. This policy explains what data the app uses and how we handle it. We do not collect or store your personal data on our servers.

**2. Data the App Uses**  
- **Cart (device only):** The app saves your cart (product IDs and quantities) in a file on your device. This data never leaves your device. You can delete it by clearing the cart or uninstalling the app.  
- **Contact and orders:** Contact Us and Proceed to Checkout open your device's email app with a pre-filled message. You choose whether to send. We do not store that content in the app. Information you send by email is handled by you and your email provider, and by us only when we receive it at bilalmuhammad987868@gmail.com.  
- **Images:** Product and collection images are loaded from the internet; no personal data is sent for that.

**3. Data We Do Not Collect**  
We do not collect names, emails, phone numbers, or addresses in the app. We do not use analytics, advertising, or tracking. We do not sell or share your data with third parties.

**4. Permissions**  
The app does not request special permissions (e.g. location, contacts, camera). Email is handled by your device's mail app.

**5. Children**  
The app does not target children. We do not knowingly collect data from children. If you are a parent and believe your child has shared data with us via email, contact us at the email below.

**6. Changes**  
We may update this policy. The "Last updated" date will change. Continued use means you accept the updated policy.

**7. Contact**  
Privacy questions: **bilalmuhammad987868@gmail.com**

---

## Development

### Setup
```bash
npm install
npx expo start
```

### Build (Android)
```bash
npx expo prebuild
npx expo run:android
```

### Environment
- `.env` – Android keystore credentials (path, alias, passwords). See `.env.example`.
- Keystore: `takafulmarket-release.keystore` in project root (for release builds).

---

## Contact

**Email:** bilalmuhammad987868@gmail.com
