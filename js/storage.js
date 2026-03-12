/**
 * LENSKART - LocalStorage Data Management
 * All keys and CRUD helpers for products, users, orders, contacts, cart, wishlist
 */

// ========== STORAGE KEYS ==========
var STORAGE_KEYS = {
  USERS: 'users',
  CURRENT_USER: 'currentUser',
  ADMIN_SESSION: 'adminSession',
  PRODUCTS: 'products',
  ORDERS: 'orders',
  CART: 'cart',
  CONTACTS: 'contacts',
  WISHLIST: 'wishlist',
  UPCOMING_PRODUCTS: 'upcomingProducts',
  PRODUCT_REVIEWS: 'productReviews'
};

// ========== DEFAULT SEED PRODUCTS ==========
var DEFAULT_SEED_PRODUCTS = [
  // ===== Sunglasses =====
  { id:"1771235419599", name:"Sunglasses", price:1500, category:"Sunglasses", imageUrl:"image/3.webp"},
  { id:"1771235499167", name:"Sunglasses", price:1500, category:"Sunglasses", imageUrl:"image/44.png"},
  { id:"1771235532127", name:"Sunglasses", price:999, category:"Sunglasses", imageUrl:"image/100.png"},
  { id:"1771235574311", name:"Sunglasses", price:1200, category:"Sunglasses", imageUrl:"image/2.png"},
  { id:"1771235662527", name:"Sunglasses", price:1200, category:"Sunglasses", imageUrl:"image/86.png"},
  { id:"1771235713391", name:"Sunglasses", price:1500, category:"Sunglasses", imageUrl:"image/89.png"},
  { id:"1771235744215", name:"Sunglasses", price:1500, category:"Sunglasses", imageUrl:"image/3.webp"},
  { id:"1771235770911", name:"Sunglasses", price:1600, category:"Sunglasses", imageUrl:"image/44.png"},
  { id:"1771235794911", name:"Sunglasses", price:1800, category:"Sunglasses", imageUrl:"image/100.png"},
  { id:"1771235832687", name:"Sunglasses", price:999, category:"Sunglasses", imageUrl:"image/2.png"},

  // ===== Other =====
  { id:"1771235876887", name:"Square Frame", price:3500, category:"Other", imageUrl:"image/86.png"},
  { id:"1771236576039", name:"Square glasses", price:1200, category:"Other", imageUrl:"image/89.png"},

  // ===== Round Frame =====
  { id:"1771235931639", name:"Round Frame", price:1200, category:"Round Frame", imageUrl:"image/3.webp"},
  { id:"1771235957631", name:"Round Frame", price:1700, category:"Round Frame", imageUrl:"image/44.png"},
  { id:"1771235983095", name:"Round Frame", price:2500, category:"Round Frame", imageUrl:"image/100.png"},
  { id:"1771236010255", name:"Round Frame", price:2500, category:"Round Frame", imageUrl:"image/2.png"},
  { id:"1771236037479", name:"Round Frame", price:999, category:"Round Frame", imageUrl:"image/86.png"},
  { id:"1771236068751", name:"Round Frame", price:1999, category:"Round Frame", imageUrl:"image/89.png"},
  { id:"1771236094119", name:"Round Frame", price:1999, category:"Round Frame", imageUrl:"image/3.webp"},
  { id:"1771236138919", name:"Round Frame", price:1199, category:"Round Frame", imageUrl:"image/44.png"},
  { id:"1771236171487", name:"Round Frame", price:1000, category:"Round Frame", imageUrl:"image/100.png"},
  { id:"1771236198647", name:"Round Frame", price:1500, category:"Round Frame", imageUrl:"image/2.png"},
  { id:"1771236245335", name:"Round Frame", price:1500, category:"Round Frame", imageUrl:"image/86.png"},
  { id:"1771236283319", name:"Round Frame", price:1300, category:"Round Frame", imageUrl:"image/89.png"},
  { id:"1771236316567", name:"Aviator Frame", price:1300, category:"Aviator", imageUrl:"image/3.webp"},
  { id:"1771236341607", name:"Round Frame", price:1800, category:"Round Frame", imageUrl:"image/44.png"},
  { id:"1771236369471", name:"Round Frame", price:1600, category:"Round Frame", imageUrl:"image/100.png"},
  { id:"1771236395199", name:"Round Frame", price:2200, category:"Round Frame", imageUrl:"image/2.png"},
  { id:"1771236434967", name:"Round Frame", price:1999, category:"Round Frame", imageUrl:"image/86.png"},
  { id:"1771236460831", name:"Round Frame", price:1000, category:"Round Frame", imageUrl:"image/89.png"},
  { id:"1771236494863", name:"Round Frame", price:1899, category:"Round Frame", imageUrl:"image/3.webp"},
  { id:"1771236539447", name:"Round Frame", price:1500, category:"Round Frame", imageUrl:"image/44.png"},
  { id:"1771236609575", name:"Round Frame", price:1199, category:"Round Frame", imageUrl:"image/100.png"},

  // ===== Reading Glasses =====
  { id:"1771236680600", name:"Reading Glasses", price:1900, category:"Reading Glasses", imageUrl:"image/4.jpg"},
  { id:"1771236707295", name:"Reading Glasses", price:1300, category:"Reading Glasses", imageUrl:"image/5.jpg"},
  { id:"1771236734999", name:"Reading Glasses", price:1500, category:"Reading Glasses", imageUrl:"image/6.jpg"},
  { id:"1771236788743", name:"Blue Light Glasses", price:1800, category:"Blue Light Glasses", imageUrl:"image/7.jpg"},
  { id:"1771236839143", name:"Reading Glasses", price:1299, category:"Reading Glasses", imageUrl:"image/8.jpg"},
  { id:"1771236871855", name:"Reading Glasses", price:1200, category:"Reading Glasses", imageUrl:"image/9.jpg"},
  { id:"1771236905751", name:"Reading Glasses", price:1500, category:"Reading Glasses", imageUrl:"image/10.jpg"},
  { id:"1771236959271", name:"Reading Glasses", price:1600, category:"Reading Glasses", imageUrl:"image/1.jpg"},
  { id:"1771236993015", name:"Reading Glasses", price:1600, category:"Reading Glasses", imageUrl:"image/11.jpg"},

  // ===== Kids Glasses =====
  { id:"1771237046479", name:"Kids Glasses", price:999, category:"Kids Glasses", imageUrl:"image/12.jpg"},
  { id:"1771237077703", name:"Kids Glasses", price:1200, category:"Frames", imageUrl:"image/14.jpg"},
  { id:"1771237110351", name:"Kids Glasses", price:1500, category:"Kids Glasses", imageUrl:"image/15.jpg"},
  { id:"1771237137496", name:"Kids Glasses", price:1600, category:"Kids Glasses", imageUrl:"image/17.jpg"},
  { id:"1771237168183", name:"Kids Glasses", price:1900, category:"Kids Glasses", imageUrl:"image/18.jpg"},
  { id:"1771237232751", name:"Kids Glasses", price:1800, category:"Kids Glasses", imageUrl:"image/19.jpg"},
  { id:"1771237329671", name:"Kids Glasses", price:1500, category:"Kids Glasses", imageUrl:"image/37.jpg"},
  { id:"1771237359767", name:"Kids Glasses", price:1200, category:"Kids Glasses", imageUrl:"image/38.jpg"},

    { id:"1771235419599", name:"Sunglasses", price:1500, category:"Sunglasses", imageUrl:"image/3.webp"},
  { id:"1771235499167", name:"Sunglasses", price:1500, category:"Sunglasses", imageUrl:"image/44.png"},
  { id:"1771235532127", name:"Sunglasses", price:999, category:"Sunglasses", imageUrl:"image/100.png"},
  { id:"1771235574311", name:"Sunglasses", price:1200, category:"Sunglasses", imageUrl:"image/2.png"},
  { id:"1771235662527", name:"Sunglasses", price:1200, category:"Sunglasses", imageUrl:"image/86.png"},
  { id:"1771235713391", name:"Sunglasses", price:1500, category:"Sunglasses", imageUrl:"image/89.png"},
  { id:"1771235744215", name:"Sunglasses", price:1500, category:"Sunglasses", imageUrl:"image/3.webp"},
  { id:"1771235770911", name:"Sunglasses", price:1600, category:"Sunglasses", imageUrl:"image/44.png"},
  { id:"1771235794911", name:"Sunglasses", price:1800, category:"Sunglasses", imageUrl:"image/100.png"},
  { id:"1771235832687", name:"Sunglasses", price:999, category:"Sunglasses", imageUrl:"image/2.png"},

  // ===== Other =====
  { id:"1771235876887", name:"Square Frame", price:3500, category:"Other", imageUrl:"image/86.png"},
  { id:"1771236576039", name:"Square glasses", price:1200, category:"Other", imageUrl:"image/89.png"},

  // ===== Round Frame =====
  { id:"1771235931639", name:"Round Frame", price:1200, category:"Round Frame", imageUrl:"image/3.webp"},
  { id:"1771235957631", name:"Round Frame", price:1700, category:"Round Frame", imageUrl:"image/44.png"},
  { id:"1771235983095", name:"Round Frame", price:2500, category:"Round Frame", imageUrl:"image/100.png"},
  { id:"1771236010255", name:"Round Frame", price:2500, category:"Round Frame", imageUrl:"image/2.png"},
  { id:"1771236037479", name:"Round Frame", price:999, category:"Round Frame", imageUrl:"image/86.png"},
  { id:"1771236068751", name:"Round Frame", price:1999, category:"Round Frame", imageUrl:"image/89.png"},
  { id:"1771236094119", name:"Round Frame", price:1999, category:"Round Frame", imageUrl:"image/3.webp"},
  { id:"1771236138919", name:"Round Frame", price:1199, category:"Round Frame", imageUrl:"image/44.png"},
  { id:"1771236171487", name:"Round Frame", price:1000, category:"Round Frame", imageUrl:"image/100.png"},
  { id:"1771236198647", name:"Round Frame", price:1500, category:"Round Frame", imageUrl:"image/2.png"},
  { id:"1771236245335", name:"Round Frame", price:1500, category:"Round Frame", imageUrl:"image/86.png"},
  { id:"1771236283319", name:"Round Frame", price:1300, category:"Round Frame", imageUrl:"image/89.png"},
  { id:"1771236316567", name:"Aviator Frame", price:1300, category:"Aviator", imageUrl:"image/3.webp"},
  { id:"1771236341607", name:"Round Frame", price:1800, category:"Round Frame", imageUrl:"image/44.png"},
  { id:"1771236369471", name:"Round Frame", price:1600, category:"Round Frame", imageUrl:"image/100.png"},
  { id:"1771236395199", name:"Round Frame", price:2200, category:"Round Frame", imageUrl:"image/2.png"},
  { id:"1771236434967", name:"Round Frame", price:1999, category:"Round Frame", imageUrl:"image/86.png"},
  { id:"1771236460831", name:"Round Frame", price:1000, category:"Round Frame", imageUrl:"image/89.png"},
  { id:"1771236494863", name:"Round Frame", price:1899, category:"Round Frame", imageUrl:"image/3.webp"},
  { id:"1771236539447", name:"Round Frame", price:1500, category:"Round Frame", imageUrl:"image/44.png"},
  { id:"1771236609575", name:"Round Frame", price:1199, category:"Round Frame", imageUrl:"image/100.png"},

  // ===== Reading Glasses =====
  { id:"1771236680600", name:"Reading Glasses", price:1900, category:"Reading Glasses", imageUrl:"image/4.jpg"},
  { id:"1771236707295", name:"Reading Glasses", price:1300, category:"Reading Glasses", imageUrl:"image/5.jpg"},
  { id:"1771236734999", name:"Reading Glasses", price:1500, category:"Reading Glasses", imageUrl:"image/6.jpg"},
  { id:"1771236788743", name:"Blue Light Glasses", price:1800, category:"Blue Light Glasses", imageUrl:"image/7.jpg"},
  { id:"1771236839143", name:"Reading Glasses", price:1299, category:"Reading Glasses", imageUrl:"image/8.jpg"},
  { id:"1771236871855", name:"Reading Glasses", price:1200, category:"Reading Glasses", imageUrl:"image/9.jpg"},
  { id:"1771236905751", name:"Reading Glasses", price:1500, category:"Reading Glasses", imageUrl:"image/10.jpg"},
  { id:"1771236959271", name:"Reading Glasses", price:1600, category:"Reading Glasses", imageUrl:"image/1.jpg"},
  { id:"1771236993015", name:"Reading Glasses", price:1600, category:"Reading Glasses", imageUrl:"image/11.jpg"},

  // ===== Kids Glasses =====
  { id:"1771237046479", name:"Kids Glasses", price:999, category:"Kids Glasses", imageUrl:"image/12.jpg"},
  { id:"1771237077703", name:"Kids Glasses", price:1200, category:"Frames", imageUrl:"image/14.jpg"},
  { id:"1771237110351", name:"Kids Glasses", price:1500, category:"Kids Glasses", imageUrl:"image/15.jpg"},
  { id:"1771237137496", name:"Kids Glasses", price:1600, category:"Kids Glasses", imageUrl:"image/17.jpg"},
  { id:"1771237168183", name:"Kids Glasses", price:1900, category:"Kids Glasses", imageUrl:"image/18.jpg"},
  { id:"1771237232751", name:"Kids Glasses", price:1800, category:"Kids Glasses", imageUrl:"image/19.jpg"},
  { id:"1771237329671", name:"Kids Glasses", price:1500, category:"Kids Glasses", imageUrl:"image/37.jpg"},
  { id:"1771237359767", name:"Kids Glasses", price:1200, category:"Kids Glasses", imageUrl:"image/38.jpg"}
];

// ========== HELPER FUNCTIONS ==========
function getJSON(key, defaultValue) {
  if (defaultValue === undefined) defaultValue = null;
  try {
    var data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (e) {
    console.error('Error reading from localStorage:', e);
    return defaultValue;
  }
}

function setJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.error('Error writing to localStorage:', e);
    return false;
  }
}

// ========== PRODUCTS FUNCTIONS ==========
function getProducts() {
  return getJSON(STORAGE_KEYS.PRODUCTS, []);
}

function saveProducts(products) {
  return setJSON(STORAGE_KEYS.PRODUCTS, products);
}

function getProductById(id) {
  var products = getProducts();
  return products.find(function(p) { return p.id === id; }) || null;
}

function addProduct(product) {
  var products = getProducts();
  var newProduct = {
    id: product.id || Date.now().toString(),
    name: (product.name || '').trim(),
    price: parseFloat(product.price) || 0,
    category: (product.category || 'Eyewear').trim(),
    imageUrl: (product.imageUrl || '').trim() || 'https://via.placeholder.com/300?text=No+Image',
    featured: product.featured || false,
    exclusive: product.exclusive || false
  };
  products.push(newProduct);
  saveProducts(products);
  return newProduct;
}

// Add product with individual parameters (for admin compatibility)
function addProductByParams(name, price, category, imageUrl) {
  return addProduct({
    name: name,
    price: price,
    category: category,
    imageUrl: imageUrl
  });
}

function updateProduct(id, updates) {
  var products = getProducts();
  var index = products.findIndex(function(p) { return p.id === id; });
  if (index === -1) return null;
  products[index] = Object.assign({}, products[index], {
    name: (updates.name || products[index].name).trim(),
    price: parseFloat(updates.price) || products[index].price,
    category: (updates.category || products[index].category).trim(),
    imageUrl: (updates.imageUrl || products[index].imageUrl).trim(),
    featured: updates.featured !== undefined ? updates.featured : products[index].featured,
    exclusive: updates.exclusive !== undefined ? updates.exclusive : products[index].exclusive
  });
  saveProducts(products);
  return products[index];
}

function deleteProduct(id) {
  var products = getProducts().filter(function(p) { return p.id !== id; });
  return saveProducts(products);
}

// ========== SEED PRODUCT MANAGEMENT FUNCTIONS ==========
/**
 * Seed default products if no products exist (alias for initDefaultProducts)
 */
function seedProductsIfEmpty() {
  return initDefaultProducts();
}

/**
 * Initialize default seed products if no products exist
 * Call this on page load to seed products
 */
function initDefaultProducts() {
  var products = getProducts();
  if (products.length === 0) {
    saveProducts(DEFAULT_SEED_PRODUCTS);
    return true;
  }
  return false;
}

/**
 * Seed/add default products to existing products (does not duplicate)
 * Returns number of products added
 */
function seedDefaultProducts() {
  var products = getProducts();
  var existingIds = products.map(function(p) { return p.id; });
  var newProducts = [];
  
  DEFAULT_SEED_PRODUCTS.forEach(function(seedProduct) {
    if (existingIds.indexOf(seedProduct.id) === -1) {
      newProducts.push(seedProduct);
    }
  });
  
  if (newProducts.length > 0) {
    products = products.concat(newProducts);
    saveProducts(products);
  }
  
  return newProducts.length;
}

/**
 * Clear all products
 * Returns true if successful
 */
function clearAllProducts() {
  return saveProducts([]);
}

/**
 * Reset products to default (clear all and restore defaults)
 * Returns true if successful
 */
function resetToDefaultProducts() {
  return saveProducts(DEFAULT_SEED_PRODUCTS);
}

/**
 * Get total number of products
 */
function getProductCount() {
  return getProducts().length;
}

/**
 * Check if current products match default seed products
 * Returns true if using default products (no custom products added)
 */
function hasDefaultProducts() {
  var products = getProducts();
  if (products.length !== DEFAULT_SEED_PRODUCTS.length) return false;
  
  var productIds = products.map(function(p) { return p.id; });
  return DEFAULT_SEED_PRODUCTS.every(function(seed) {
    return productIds.indexOf(seed.id) !== -1;
  });
}

/**
 * Get count of default products currently in storage
 */
function getDefaultProductCount() {
  var products = getProducts();
  var count = 0;
  var defaultIds = DEFAULT_SEED_PRODUCTS.map(function(p) { return p.id; });
  
  products.forEach(function(p) {
    if (defaultIds.indexOf(p.id) !== -1) count++;
  });
  
  return count;
}

/**
 * Get count of custom products (non-default)
 */
function getCustomProductCount() {
  var products = getProducts();
  var defaultIds = DEFAULT_SEED_PRODUCTS.map(function(p) { return p.id; });
  
  return products.filter(function(p) {
    return defaultIds.indexOf(p.id) === -1;
  }).length;
}

// ========== USERS FUNCTIONS ==========
function getUsers() {
  return getJSON(STORAGE_KEYS.USERS, []);
}

function saveUsers(users) {
  return setJSON(STORAGE_KEYS.USERS, users);
}

function getCurrentUser() {
  return getJSON(STORAGE_KEYS.CURRENT_USER, null);
}

function setCurrentUser(user) {
  if (user) {
    return setJSON(STORAGE_KEYS.CURRENT_USER, user);
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    return true;
  }
}

function clearCurrentUser() {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
}

// ========== ADMIN FUNCTIONS ==========
function getAdminSession() {
  return getJSON(STORAGE_KEYS.ADMIN_SESSION, null);
}

function setAdminSession(session) {
  return setJSON(STORAGE_KEYS.ADMIN_SESSION, session);
}

function clearAdminSession() {
  localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
}

function isAdminLoggedIn() {
  var session = getAdminSession();
  return session !== null;
}

// ========== ORDERS FUNCTIONS ==========
function getOrders() {
  return getJSON(STORAGE_KEYS.ORDERS, []);
}

function saveOrders(orders) {
  return setJSON(STORAGE_KEYS.ORDERS, orders);
}

function addOrder(order) {
  var orders = getOrders();
  var newOrder = Object.assign({}, order, {
    id: order.id || Date.now().toString(),
    date: order.date || new Date().toISOString(),
    status: order.status || 'Pending'
  });
  orders.push(newOrder);
  saveOrders(orders);
  return newOrder;
}

function updateOrder(id, updates) {
  var orders = getOrders();
  var index = orders.findIndex(function(o) { return o.id === id; });
  if (index === -1) return null;
  orders[index] = Object.assign({}, orders[index], updates);
  saveOrders(orders);
  return orders[index];
}

function getOrdersByUserId(userId) {
  return getOrders().filter(function(o) { return o.userId === userId; });
}

// ========== CART FUNCTIONS ==========
function getCart() {
  return getJSON(STORAGE_KEYS.CART, []);
}

function saveCart(cart) {
  return setJSON(STORAGE_KEYS.CART, cart);
}

function clearCart() {
  return saveCart([]);
}

// ========== CONTACTS FUNCTIONS ==========
function getContacts() {
  return getJSON(STORAGE_KEYS.CONTACTS, []);
}

function saveContacts(contacts) {
  return setJSON(STORAGE_KEYS.CONTACTS, contacts);
}

function addContact(contact) {
  var contacts = getContacts();
  var newContact = Object.assign({}, contact, {
    id: contact.id || Date.now().toString(),
    date: contact.date || new Date().toISOString()
  });
  contacts.push(newContact);
  saveContacts(contacts);
  return newContact;
}

// ========== UPCOMING PRODUCTS FUNCTIONS ==========
function getUpcomingProducts() {
  return getJSON(STORAGE_KEYS.UPCOMING_PRODUCTS, []);
}

function saveUpcomingProducts(products) {
  return setJSON(STORAGE_KEYS.UPCOMING_PRODUCTS, products);
}

function addUpcomingProduct(product) {
  var products = getUpcomingProducts();
  var newProduct = Object.assign({}, product, {
    id: product.id || Date.now().toString(),
    createdAt: new Date().toISOString()
  });
  products.push(newProduct);
  saveUpcomingProducts(products);
  return newProduct;
}

function deleteUpcomingProduct(id) {
  var products = getUpcomingProducts().filter(function(p) { return p.id !== id; });
  return saveUpcomingProducts(products);
}

// ========== PRODUCT REVIEWS FUNCTIONS ==========
function getProductReviews() {
  return getJSON(STORAGE_KEYS.PRODUCT_REVIEWS, []);
}

function saveProductReviews(reviews) {
  return setJSON(STORAGE_KEYS.PRODUCT_REVIEWS, reviews);
}

function addProductReview(review) {
  var reviews = getProductReviews();
  var newReview = Object.assign({}, review, {
    id: review.id || Date.now().toString(),
    createdAt: new Date().toISOString()
  });
  reviews.push(newReview);
  saveProductReviews(reviews);
  return newReview;
}

// ========== INITIALIZATION ==========
// Note: Do NOT auto-initialize here - admin.js handles seeding
// Call initDefaultProducts() manually if needed

