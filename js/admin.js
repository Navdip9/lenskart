/** LENSKART - Admin (LocalStorage: adminSession, products, orders, contacts) */

var ADMIN_USERNAME = 'admin';
var ADMIN_PASSWORD = 'admin123';

// ========== ADMIN SESSION FUNCTIONS ==========
function getAdminSession() { var d = localStorage.getItem('adminSession'); return d ? JSON.parse(d) : null; }
function setAdminSession() { localStorage.setItem('adminSession', JSON.stringify({ loggedIn: true, at: new Date().toISOString() })); }
function clearAdminSession() { localStorage.removeItem('adminSession'); }

function requireAdmin() { if (!getAdminSession()) { window.location.href = 'admin-login.html'; return false; } return true; }

function adminLogin(username, password) {
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) { setAdminSession(); return { success: true }; }
  return { success: false, message: 'Invalid admin credentials.' };
}

function adminLogout() { clearAdminSession(); window.location.href = 'admin-login.html'; }

// ========== PRODUCT CATEGORIES ==========
var PRODUCT_CATEGORIES = ['Men', 'Women', 'Kids', 'Eyewear', 'Sunglasses', 'Blue Light Glasses', 'Reading Glasses', 'Contact Lenses', 'Frames', 'Kids Glasses', 'Polarized Sunglasses', 'Aviator', 'Round Frame', 'Cat-Eye', 'Sports Glasses', 'Other'];

// ========== SEED PRODUCTS ==========
function seedProductsIfEmpty() {
  var d = localStorage.getItem('products');
  var existing = d ? JSON.parse(d) : [];
  if (existing.length > 0) return;
  
  var defaultProducts = [
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
    { id:"1771235876887", name:"Square Frame", price:3500, category:"Other", imageUrl:"image/86.png"},
    { id:"1771236576039", name:"Square glasses", price:1200, category:"Other", imageUrl:"image/89.png"},
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
    { id:"1771236680600", name:"Reading Glasses", price:1900, category:"Reading Glasses", imageUrl:"image/4.jpg"},
    { id:"1771236707295", name:"Reading Glasses", price:1300, category:"Reading Glasses", imageUrl:"image/5.jpg"},
    { id:"1771236734999", name:"Reading Glasses", price:1500, category:"Reading Glasses", imageUrl:"image/6.jpg"},
    { id:"1771236788743", name:"Blue Light Glasses", price:1800, category:"Blue Light Glasses", imageUrl:"image/7.jpg"},
    { id:"1771236839143", name:"Reading Glasses", price:1299, category:"Reading Glasses", imageUrl:"image/8.jpg"},
    { id:"1771236871855", name:"Reading Glasses", price:1200, category:"Reading Glasses", imageUrl:"image/9.jpg"},
    { id:"1771236905751", name:"Reading Glasses", price:1500, category:"Reading Glasses", imageUrl:"image/10.jpg"},
    { id:"1771236959271", name:"Reading Glasses", price:1600, category:"Reading Glasses", imageUrl:"image/1.jpg"},
    { id:"1771236993015", name:"Reading Glasses", price:1600, category:"Reading Glasses", imageUrl:"image/11.jpg"},
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
    { id:"1771235876887", name:"Square Frame", price:3500, category:"Other", imageUrl:"image/86.png"},
    { id:"1771236576039", name:"Square glasses", price:1200, category:"Other", imageUrl:"image/89.png"},
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
    { id:"1771236680600", name:"Reading Glasses", price:1900, category:"Reading Glasses", imageUrl:"image/4.jpg"},
    { id:"1771236707295", name:"Reading Glasses", price:1300, category:"Reading Glasses", imageUrl:"image/5.jpg"},
    { id:"1771236734999", name:"Reading Glasses", price:1500, category:"Reading Glasses", imageUrl:"image/6.jpg"},
    { id:"1771236788743", name:"Blue Light Glasses", price:1800, category:"Blue Light Glasses", imageUrl:"image/7.jpg"},
    { id:"1771236839143", name:"Reading Glasses", price:1299, category:"Reading Glasses", imageUrl:"image/8.jpg"},
    { id:"1771236871855", name:"Reading Glasses", price:1200, category:"Reading Glasses", imageUrl:"image/9.jpg"},
    { id:"1771236905751", name:"Reading Glasses", price:1500, category:"Reading Glasses", imageUrl:"image/10.jpg"},
    { id:"1771236959271", name:"Reading Glasses", price:1600, category:"Reading Glasses", imageUrl:"image/1.jpg"},
    { id:"1771236993015", name:"Reading Glasses", price:1600, category:"Reading Glasses", imageUrl:"image/11.jpg"},
    { id:"1771237046479", name:"Kids Glasses", price:999, category:"Kids Glasses", imageUrl:"image/12.jpg"},
    { id:"1771237077703", name:"Kids Glasses", price:1200, category:"Frames", imageUrl:"image/14.jpg"},
    { id:"1771237110351", name:"Kids Glasses", price:1500, category:"Kids Glasses", imageUrl:"image/15.jpg"},
    { id:"1771237137496", name:"Kids Glasses", price:1600, category:"Kids Glasses", imageUrl:"image/17.jpg"},
    { id:"1771237168183", name:"Kids Glasses", price:1900, category:"Kids Glasses", imageUrl:"image/18.jpg"},
    { id:"1771237232751", name:"Kids Glasses", price:1800, category:"Kids Glasses", imageUrl:"image/19.jpg"},
    { id:"1771237329671", name:"Kids Glasses", price:1500, category:"Kids Glasses", imageUrl:"image/37.jpg"},
    { id:"1771237359767", name:"Kids Glasses", price:1200, category:"Kids Glasses", imageUrl:"image/38.jpg"},
  ];
  
  localStorage.setItem('products', JSON.stringify(defaultProducts));
}

// ========== PRODUCT FUNCTIONS ==========
function getAdminProducts() { 
  var d = localStorage.getItem('products'); 
  return d ? JSON.parse(d) : []; 
}

function saveAdminProducts(products) { 
  localStorage.setItem('products', JSON.stringify(products)); 
}

function addProduct(name, price, category, imageUrl) {
  var products = getAdminProducts();
  // Save exactly what user enters - no path manipulation
  products.push({
    id: Date.now().toString(),
    name: (name || '').trim(),
    price: parseFloat(price) || 0,
    category: (category || 'Eyewear').trim(),
    imageUrl: (imageUrl || '').trim()
  });
  saveAdminProducts(products);
}

function updateProduct(id, name, price, category, imageUrl) {
  var products = getAdminProducts();
  var idx = products.findIndex(function(p) { return p.id === id; });
  if (idx === -1) return false;
  products[idx] = { 
    id: products[idx].id, 
    name: (name || '').trim(), 
    price: parseFloat(price) || 0, 
    category: (category || 'Eyewear').trim(), 
    imageUrl: (imageUrl || '').trim() || products[idx].imageUrl 
  };
  saveAdminProducts(products);
  return true;
}

function deleteProduct(id) {
  var products = getAdminProducts().filter(function(p) { return p.id !== id; });
  saveAdminProducts(products);
}

// ========== ORDER FUNCTIONS ==========
function getAdminOrders() { var d = localStorage.getItem('orders'); return d ? JSON.parse(d) : []; }

function updateOrderStatus(orderId, status) {
  var orders = getAdminOrders();
  var order = orders.find(function(o) { return o.id === orderId; });
  if (!order) return false;
  order.status = status;
  localStorage.setItem('orders', JSON.stringify(orders));
  return true;
}

var ORDER_STATUSES = [
  { value: 'Pending', label: 'Pending' },
  { value: 'Confirmed', label: 'Confirmed' },
  { value: 'Shipped', label: 'Shipping Dispatched' },
  { value: 'Cancelled', label: 'Cancelled' }
];

function getContacts() { var d = localStorage.getItem('contacts'); return d ? JSON.parse(d) : []; }

function getAdminContacts() { var d = localStorage.getItem('contacts'); return d ? JSON.parse(d) : []; }

// ========== UPCOMING PRODUCTS FUNCTIONS ==========
function getUpcomingProducts() { var d = localStorage.getItem('upcomingProducts'); return d ? JSON.parse(d) : []; }
function saveUpcomingProducts(list) { localStorage.setItem('upcomingProducts', JSON.stringify(list)); }
function addUpcomingProduct(name, description, imageUrl, category, releaseDate) {
  var list = getUpcomingProducts();
  list.push({
    id: Date.now().toString(),
    name: (name || '').trim(),
    description: (description || '').trim(),
    imageUrl: (imageUrl || '').trim() || 'https://via.placeholder.com/300?text=Coming+Soon',
    category: (category || 'Eyewear').trim(),
    releaseDate: (releaseDate || '').trim(),
    createdAt: new Date().toISOString()
  });
  saveUpcomingProducts(list);
}
function updateUpcomingProduct(id, name, description, imageUrl, category, releaseDate) {
  var list = getUpcomingProducts();
  var idx = list.findIndex(function(p) { return p.id === id; });
  if (idx === -1) return false;
  list[idx] = {
    id: list[idx].id,
    name: (name || '').trim(),
    description: (description || '').trim(),
    imageUrl: (imageUrl || '').trim() || list[idx].imageUrl,
    category: (category || 'Eyewear').trim(),
    releaseDate: (releaseDate || '').trim(),
    createdAt: list[idx].createdAt
  };
  saveUpcomingProducts(list);
  return true;
}
function deleteUpcomingProduct(id) {
  saveUpcomingProducts(getUpcomingProducts().filter(function(p) { return p.id !== id; }));
}
