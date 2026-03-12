/** LENSKART - User helpers, navbar, products, profile */
/* Note: Core storage functions are now in storage.js (loaded before this file) */

function updateNavbar() {
  var user = getCurrentUser();
  var loginEl = document.getElementById('nav-login');
  var profileEl = document.getElementById('nav-profile');
  var logoutEl = document.getElementById('nav-logout');
  if (user) {
    if (loginEl) loginEl.style.display = 'none';
    if (profileEl) profileEl.style.display = '';
    if (logoutEl) logoutEl.style.display = '';
  } else {
    if (loginEl) loginEl.style.display = '';
    if (profileEl) profileEl.style.display = 'none';
    if (logoutEl) logoutEl.style.display = 'none';
  }
}

function updateFooterAuth() {
  var user = getCurrentUser();
  var loginEl = document.getElementById('footer-login');
  var registerEl = document.getElementById('footer-register');
  var profileEl = document.getElementById('footer-profile');
  var logoutEl = document.getElementById('footer-logout');
  if (user) {
    if (loginEl) loginEl.style.display = 'none';
    if (registerEl) registerEl.style.display = 'none';
    if (profileEl) profileEl.style.display = '';
    if (logoutEl) logoutEl.style.display = '';
  } else {
    if (loginEl) loginEl.style.display = '';
    if (registerEl) registerEl.style.display = '';
    if (profileEl) profileEl.style.display = 'none';
    if (logoutEl) logoutEl.style.display = 'none';
  }
}

// getProducts() and getUpcomingProducts() are now in storage.js

function getCartCount() {
  var d = localStorage.getItem('cart');
  var cart = d ? JSON.parse(d) : [];
  return cart.reduce(function(s, i) { return s + (i.quantity || 1); }, 0);
}

function updateCartBadge() {
  var badge = document.getElementById('cart-count');
  if (badge) { var c = getCartCount(); badge.textContent = c; badge.style.display = c > 0 ? 'flex' : 'none'; }
}

// ========== WISHLIST FUNCTIONS ==========
function getWishlist() {
  var user = getCurrentUser();
  if (!user) return [];
  var key = 'wishlist_' + user.id;
  var d = localStorage.getItem(key);
  return d ? JSON.parse(d) : [];
}

function saveWishlist(wishlist) {
  var user = getCurrentUser();
  if (!user) return;
  var key = 'wishlist_' + user.id;
  localStorage.setItem(key, JSON.stringify(wishlist));
  updateWishlistBadge();
}

function addToWishlist(productId) {
  var user = getCurrentUser();
  if (!user) { alert('Please login to add items to wishlist.'); window.location.href = 'login.html?redirect=wishlist'; return; }
  var products = getProducts();
  var product = products.find(function(p) { return p.id === productId; });
  if (!product) return;
  var wishlist = getWishlist();
  var exists = wishlist.find(function(item) { return item.productId === productId; });
  if (exists) { alert('This product is already in your wishlist!'); return; }
  wishlist.push({ productId: product.id, name: product.name, price: product.price, imageUrl: product.imageUrl, addedAt: new Date().toISOString() });
  saveWishlist(wishlist);
  alert('Added to wishlist!');
}

function removeFromWishlist(productId) {
  var wishlist = getWishlist();
  wishlist = wishlist.filter(function(item) { return item.productId !== productId; });
  saveWishlist(wishlist);
}

function isInWishlist(productId) {
  var wishlist = getWishlist();
  return wishlist.some(function(item) { return item.productId === productId; });
}

function getWishlistCount() {
  return getWishlist().length;
}

function updateWishlistBadge() {
  var badge = document.getElementById('wishlist-count');
  if (badge) { var c = getWishlistCount(); badge.textContent = c; badge.style.display = c > 0 ? 'flex' : 'none'; }
}

function toggleWishlist(productId) {
  if (isInWishlist(productId)) {
    removeFromWishlist(productId);
    alert('Removed from wishlist!');
  } else {
    addToWishlist(productId);
  }
}

// Helper function to render star rating
function renderStarRating(rating, showCount) {
  if (rating === undefined || rating === null) rating = 0;
  var fullStars = Math.floor(rating);
  var hasHalfStar = rating - fullStars >= 0.5;
  var html = '<div class="product-rating">';
  for (var i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      html += '<span class="star filled">★</span>';
    } else if (i === fullStars + 1 && hasHalfStar) {
      html += '<span class="star half">★</span>';
    } else {
      html += '<span class="star empty">★</span>';
    }
  }
  if (showCount) {
    var count = 0;
    var reviews = getProductReviews();
    reviews.forEach(function(r) { if (r.productId === product.id) count++; });
    html += '<span class="rating-count">(' + count + ')</span>';
  }
  html += '</div>';
  return html;
}

function renderProductCard(product, showAddToCart) {
  if (showAddToCart === undefined) showAddToCart = true;
  var div = document.createElement('div');
  div.className = 'product-card';
  div.dataset.productId = product.id;
  
  // Use image as-is (client is at root level)
  var imgUrl = product.imageUrl || '';
  if (!imgUrl) imgUrl = 'https://via.placeholder.com/300/0066cc/ffffff?text=No+Image';
  
  // Check if product is in wishlist
  var inWishlist = isInWishlist(product.id);
  var wishlistBtn = '<button class="wishlist-btn ' + (inWishlist ? 'active' : '') + '" data-id="' + product.id + '" title="' + (inWishlist ? 'Remove from wishlist' : 'Add to wishlist') + '">' +
    (inWishlist ? '♥' : '♡') + '</button>';
  
  // Get product rating
  var rating = getProductRating(product.id);
  var reviewCount = getProductReviewCount(product.id);
  var ratingHtml = '';
  if (rating > 0) {
    var fullStars = Math.floor(rating);
    var starsHtml = '';
    for (var i = 1; i <= 5; i++) {
      starsHtml += i <= fullStars ? '★' : '☆';
    }
    ratingHtml = '<div class="product-rating">' + starsHtml + ' <span class="rating-value">' + rating.toFixed(1) + '</span> <span class="rating-count">(' + reviewCount + ')</span></div>';
  }
  
  var fallbackImg = 'https://via.placeholder.com/300/0066cc/ffffff?text=No+Image';
  div.innerHTML = '<div class="product-card-img-wrap">' + 
    '<img src="' + imgUrl + '" alt="' + product.name + '" onerror="this.src=\'' + fallbackImg + '\'">' +
    wishlistBtn +
    '</div>' +
    '<div class="info"><div class="name">' + product.name + '</div><div class="category">' + (product.category || 'Eyewear') + '</div>' +
    ratingHtml +
    '<div class="price">₹' + product.price + '</div>' +
    (showAddToCart ? '<button class="btn btn-primary add-to-cart" data-id="' + product.id + '">Add to Cart</button>' : '') + '</div>';
  
  if (showAddToCart) div.querySelector('.add-to-cart').addEventListener('click', function() { addToCart(product.id); });
  
  // Add wishlist button event listener
  var wishlistBtnEl = div.querySelector('.wishlist-btn');
  if (wishlistBtnEl) {
    wishlistBtnEl.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleWishlist(product.id);
      // Update button appearance
      var isInWl = isInWishlist(product.id);
      this.classList.toggle('active', isInWl);
      this.innerHTML = isInWl ? '♥' : '♡';
      this.title = isInWl ? 'Remove from wishlist' : 'Add to wishlist';
    });
  }
  
  return div;
}

function addToCart(productId) {
  var user = getCurrentUser();
  if (!user) { alert('Please login to add items to cart.'); window.location.href = 'login.html?redirect=cart'; return; }
  var products = getProducts();
  var product = products.find(function(p) { return p.id === productId; });
  if (!product) return;
  var d = localStorage.getItem('cart');
  var cart = d ? JSON.parse(d) : [];
  var ex = cart.find(function(i) { return i.productId === productId; });
  if (ex) ex.quantity = (ex.quantity || 1) + 1;
  else cart.push({ productId: product.id, name: product.name, price: product.price, imageUrl: product.imageUrl, quantity: 1 });
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartBadge();
  alert('Added to cart!');
}

function loadFeaturedProducts(containerId, limit) {
  limit = limit || 6;
  var container = document.getElementById(containerId);
  if (!container) return;
  var products = getProducts();
  // Filter products where featured is true (or undefined for backward compatibility - show all)
  var featured = products.filter(function(p) { return p.featured === true || p.featured === undefined; });
  container.innerHTML = '';
  featured.slice(0, limit).forEach(function(p) { container.appendChild(renderProductCard(p)); });
  updateCartBadge();
}

function loadExclusiveProducts(containerId, limit) {
  limit = limit || 6;
  var container = document.getElementById(containerId);
  if (!container) return;
  var products = getProducts();
  // Filter products where exclusive is true (or undefined for backward compatibility - show all)
  var exclusive = products.filter(function(p) { return p.exclusive === true || p.exclusive === undefined; });
  container.innerHTML = '';
  var fallbackImg = 'https://via.placeholder.com/300/0066cc/ffffff?text=No+Image';
  exclusive.slice(0, limit).forEach(function(p) {
    // Use image as-is (client is at root level)
    var imgUrl = p.imageUrl || '';
    if (!imgUrl) imgUrl = fallbackImg;
    var div = document.createElement('div');
    div.className = 'product-card product-card-exclusive';
    div.setAttribute('role', 'button');
    div.setAttribute('tabindex', '0');
    div.innerHTML = '<img src="' + imgUrl + '" alt="' + p.name + '" onerror="this.src=\'' + fallbackImg + '\'">' +
      '<div class="info"><div class="name">' + p.name + '</div><div class="category">' + (p.category || 'Eyewear') + '</div><div class="price">₹' + p.price + '</div><span class="view-3d-hint">Click to view in 3D</span></div>';
    div.addEventListener('click', function() { if (typeof window.openProductView === 'function') window.openProductView(p); });
    div.addEventListener('keydown', function(e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (typeof window.openProductView === 'function') window.openProductView(p); } });
    container.appendChild(div);
  });
}

function renderUpcomingCard(p) {
  var fallbackImg = 'https://via.placeholder.com/300/0066cc/ffffff?text=Coming+Soon';
  var div = document.createElement('div');
  div.className = 'product-card product-card-exclusive upcoming-product-card upcoming-card-anim';
  div.setAttribute('role', 'button');
  div.setAttribute('tabindex', '0');
  div.innerHTML = '<div class="upcoming-card-3d-inner">' +
    '<img src="' + (p.imageUrl || fallbackImg) + '" alt="' + p.name + '" onerror="this.src=\'' + fallbackImg + '\'">' +
    '<div class="info">' +
    '<div class="name">' + p.name + '</div>' +
    '<div class="category">' + (p.category || 'Eyewear') + '</div>' +
    '<div class="price">Coming Soon</div>' +
    '<span class="view-3d-hint">Click for preview</span>' +
    '</div></div>';
  var payload = { id: p.id, name: p.name, category: p.category || 'Eyewear', imageUrl: p.imageUrl || fallbackImg, price: '' };
  div.addEventListener('click', function() { if (typeof window.openProductView === 'function') window.openProductView(payload); });
  div.addEventListener('keydown', function(e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (typeof window.openProductView === 'function') window.openProductView(payload); } });
  return div;
}
function loadUpcomingProducts(containerId) {
  var container = document.getElementById(containerId);
  if (!container) return;
  var list = getUpcomingProducts();
  container.innerHTML = '';
  list.forEach(function(p, i) {
    var card = renderUpcomingCard(p);
    card.style.animationDelay = (i * 0.12) + 's';
    container.appendChild(card);
  });
}

function getUserOrderStats(userId) {
  var d = localStorage.getItem('orders');
  var orders = d ? JSON.parse(d) : [];
  var userOrders = orders.filter(function(o) { return o.userId === userId; });
  return { totalOrders: userOrders.length, totalSpent: userOrders.reduce(function(s, o) { return s + (o.totalAmount || 0); }, 0) };
}

function getUserOrders(userId) {
  var d = localStorage.getItem('orders');
  var orders = d ? JSON.parse(d) : [];
  return orders.filter(function(o) { return o.userId === userId; }).reverse();
}

// ========== RATING FUNCTIONS (Now using storage.js) ==========
// getProductReviews() and saveProductReviews() are now in storage.js

function addProductReview(productId, rating, review, userId) {
  var user = getCurrentUser();
  if (!user) { alert('Please login to submit a review.'); window.location.href = 'login.html?redirect=products'; return; }
  var reviews = getProductReviews();
  var existingIndex = reviews.findIndex(function(r) { return r.productId === productId && r.userId === user.id; });
  var newReview = {
    id: Date.now().toString(),
    productId: productId,
    userId: user.id,
    userName: user.name || user.email,
    rating: parseInt(rating, 10),
    review: review || '',
    createdAt: new Date().toISOString()
  };
  if (existingIndex >= 0) {
    reviews[existingIndex] = newReview;
  } else {
    reviews.push(newReview);
  }
  saveProductReviews(reviews);
  return true;
}

function getProductRating(productId) {
  var reviews = getProductReviews();
  var productReviews = reviews.filter(function(r) { return r.productId === productId; });
  if (productReviews.length === 0) return 0;
  var sum = productReviews.reduce(function(s, r) { return s + (r.rating || 0); }, 0);
  return sum / productReviews.length;
}

function getProductReviewCount(productId) {
  var reviews = getProductReviews();
  return reviews.filter(function(r) { return r.productId === productId; }).length;
}

function getProductReviewsForProduct(productId) {
  var reviews = getProductReviews();
  return reviews.filter(function(r) { return r.productId === productId; }).sort(function(a, b) { return new Date(b.createdAt) - new Date(a.createdAt); });
}

function getUserReviewForProduct(productId, userId) {
  var reviews = getProductReviews();
  return reviews.find(function(r) { return r.productId === productId && r.userId === userId; });
}

function getTopRatedProducts(limit) {
  limit = limit || 6;
  var reviews = getProductReviews();
  var products = getProducts();
  if (reviews.length === 0) return products.slice(0, limit);
  var byProduct = {};
  reviews.forEach(function(r) {
    if (!byProduct[r.productId]) byProduct[r.productId] = { sum: 0, count: 0 };
    byProduct[r.productId].sum += r.rating || 0;
    byProduct[r.productId].count += 1;
  });
  var sorted = Object.keys(byProduct).map(function(pid) {
    var o = byProduct[pid];
    return { productId: pid, avg: o.sum / o.count };
  }).sort(function(a, b) { return b.avg - a.avg; }).slice(0, limit);
  return sorted.map(function(x) { return products.find(function(p) { return p.id === x.productId; }); }).filter(Boolean);
}
function getTopSellingProducts(limit) {
  limit = limit || 6;
  var d = localStorage.getItem('orders');
  var orders = d ? JSON.parse(d) : [];
  var count = {};
  orders.forEach(function(o) {
    (o.items || []).forEach(function(i) {
      var id = i.productId;
      count[id] = (count[id] || 0) + (i.quantity || 1);
    });
  });
  var sorted = Object.keys(count).map(function(id) { return { productId: id, qty: count[id] }; }).sort(function(a, b) { return b.qty - a.qty; }).slice(0, limit);
  var products = getProducts();
  return sorted.map(function(x) { return products.find(function(p) { return p.id === x.productId; }); }).filter(Boolean);
}

function getStatusLabel(status) {
  if (status === 'Shipped') return 'Shipping Dispatched';
  if (status === 'Confirmed') return 'Confirmed';
  if (status === 'Cancelled') return 'Cancelled';
  return status || 'Pending';
}

function canCancelOrder(order) {
  var s = (order && order.status) || 'Pending';
  return s === 'Pending' || s === 'Confirmed';
}

function cancelOrder(orderId) {
  var user = getCurrentUser();
  if (!user) return false;
  var d = localStorage.getItem('orders');
  var orders = d ? JSON.parse(d) : [];
  var order = orders.find(function(o) { return o.id === orderId && o.userId === user.id; });
  if (!order) return false;
  if (order.status === 'Shipped' || order.status === 'Cancelled') return false;
  order.status = 'Cancelled';
  localStorage.setItem('orders', JSON.stringify(orders));
  return true;
}

document.addEventListener("DOMContentLoaded", function () {

  updateNavbar();
  updateFooterAuth();
  updateCartBadge();
  updateWishlistBadge();

  // load products
  loadFeaturedProducts("featured-products", 6);
  loadExclusiveProducts("exclusive-products", 6);
  loadUpcomingProducts("upcoming-products");

});

