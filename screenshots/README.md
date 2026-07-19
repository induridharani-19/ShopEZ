# ShopEZ Screenshots & Demo Evidence Guide

This folder holds screenshots and video evidence verifying the ShopEZ storefront application. Follow this guide to capture required files for submission.

## 🎬 Application Demo Video

Below is the verified video demonstration of the ShopEZ storefront and administration dashboard in action:

<div align="center">
  <video src="demo-video.mp4" width="100%" height="auto" controls></video>
  <br>
  <a href="https://github.com/induridharani-19/ShopEZ/raw/main/screenshots/demo-video.mp4">Download/View Raw Video File</a>
</div>

---

## 1. Required Screenshots Checklist

Please run the application locally and capture screenshots of these key views, saving them in this directory:

- [ ] **1_Home_Page.png**: Home page displaying the hero banner, category navigation list, and flash sale cards.
- [ ] **2_Products_Catalog.png**: Search catalog showing product lists, active search bar filters, and sorting dropdown selections.
- [ ] **3_Product_Details.png**: Item details displaying descriptions, item ratings, and the purple **AI-Powered Product Recommendations** shelf.
- [ ] **4_AI_Chatbot.png**: Floating AI Shopping Advisor drawer open with sample dialogue (e.g. searching for "backpacks") and recommended item cards.
- [ ] **5_Shopping_Cart.png**: Cart details showing product items, quantity modifiers, and the applied discount coupon `SAVE10`.
- [ ] **6_Checkout_Validation.png**: Checkout screen showing address fields and Card/UPI payment validation error states.
- [ ] **7_User_Profile.png**: Customer profile displaying recent order history.
- [ ] **8_Admin_Dashboard.png**: Administrator view displaying the dynamic stats grid (Products count, registered Users, Orders count, and live Revenue).
- [ ] **9_Admin_Users.png**: Admin users list displaying user profiles and delete action triggers.

---

## 2. 3-5 Minute Demo Recording Script

Use this script to record your final project video presentation:

### Part 1: Introduction & Buyer Journey (Duration: 0:00 - 1:30)
- **Action**: Open the homepage. Sign up a new customer and log in.
- **Narrative**:
  > "Hello, today I will show you ShopEZ, our AI-enhanced secure e-commerce application. We start by registering a new customer. After registering, we log in, which securely stores our session JWT token. Next, we browse the catalog. We can search for items like 'T-shirt' or filter by category."

### Part 2: AI Recommendations & Conversational Chat (Duration: 1:30 - 2:30)
- **Action**: Open any product page to show the Purple AI shelf. Then, open the floating Chatbot drawer and type: *"I need a laptop"* or *"recommend something"*.
- **Narrative**:
  > "If we open a product page, the system fetches content similarity scores and displays similar products in real-time. If the Python ML server is down, our Javascript backend fallback executes term matches. We can also open our AI Chatbot to converse in natural language. The chatbot suggests matching products which link directly to their details pages."

### Part 3: Cart, Validation & Checkout (Duration: 2:30 - 3:30)
- **Action**: Add items to the cart, apply coupon code `SAVE10`, go to checkout, enter an invalid CVV/UPI to show validation errors, then enter valid details and place the order.
- **Narrative**:
  > "Now we add products to the cart and apply the coupon SAVE10 to receive a 10% discount. In the checkout panel, our inputs are verified. An invalid card length or malformed UPI returns immediate error toasts. If we enter valid credentials, the checkout process completes and clears our cart."

### Part 4: Admin Controls & Dashboard (Duration: 3:30 - 4:30)
- **Action**: Log out and log back in as `admin@shopez.com` with password `admin123`. Open the Admin Dashboard. Show the dynamic counts (Users, Products, Revenue), and review the User management list.
- **Narrative**:
  > "Finally, we log in as an administrator. Standard customers are blocked from admin routes, but admins have access to the Dashboard. Here, statistics are calculated dynamically from our MongoDB Atlas database, showing live counts and sales revenue. We can also view and delete users, update order shipping states, and manage the catalog."
