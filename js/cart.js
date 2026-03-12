/** LENSKART - Cart & Orders (LocalStorage: cart, orders) */
/* Note: Core storage functions are now in storage.js (loaded before this file) */

function getCart() { return getJSON('cart', []); }
function saveCart(cart) { 
  setJSON('cart', cart); 
  if (typeof updateCartBadge === 'function') updateCartBadge(); 
}

function updateCartQuantity(productId, delta) {
  var cart = getCart();
  var item = cart.find(function(i) { return i.productId === productId; });
  if (!item) return;
  item.quantity = (item.quantity || 1) + delta;
  if (item.quantity <= 0) cart.splice(cart.indexOf(item), 1);
  saveCart(cart);
  if (typeof renderCartPage === 'function') renderCartPage();
}

function removeFromCart(productId) { 
  saveCart(getCart().filter(function(i) { return i.productId !== productId; })); 
  if (typeof renderCartPage === 'function') renderCartPage(); 
}

function getCartTotal() { return getCart().reduce(function(s, i) { return s + (i.price * (i.quantity || 1)); }, 0); }

function placeOrder() {
  var user = getCurrentUser();
  if (!user) { alert('Please login to place order.'); window.location.href = 'login.html'; return; }
  var cart = getCart();
  if (cart.length === 0) { alert('Your cart is empty.'); return; }
  var d = localStorage.getItem('orders');
  var orders = d ? JSON.parse(d) : [];
  orders.push({
    id: Date.now().toString(),
    userId: user.id,
    userName: user.name,
    userEmail: user.email,
    items: cart.map(function(i) { return { productId: i.productId, name: i.name, price: i.price, quantity: i.quantity || 1 }; }),
    totalAmount: getCartTotal(),
    date: new Date().toISOString(),
    status: 'Pending'
  });
  localStorage.setItem('orders', JSON.stringify(orders));
  saveCart([]);
  alert('Order placed successfully!');
  window.location.href = 'profile.html';
}

function renderCartPage() {
  var container = document.getElementById('cart-items');
  var totalEl = document.getElementById('cart-total');
  var finalEl = document.getElementById('cart-total-final');
  var emptyEl = document.getElementById('cart-empty');
  var contentEl = document.getElementById('cart-content');
  var cart = getCart();
  if (typeof updateCartBadge === 'function') updateCartBadge();
  if (!container) return;
  if (cart.length === 0) {
    if (emptyEl) emptyEl.style.display = 'block';
    if (contentEl) contentEl.style.display = 'none';
    return;
  }
  if (emptyEl) emptyEl.style.display = 'none';
  if (contentEl) contentEl.style.display = 'block';
  var totalAmount = getCartTotal().toFixed(0);
  container.innerHTML = cart.map(function(item) {
    return '<div class="cart-item" data-id="' + item.productId + '">' +
      '<img src="' + (item.imageUrl || 'https://via.placeholder.com/80?text=No+Image') + '" alt="' + item.name + '">' +
      '<div class="cart-item-details"><div class="cart-item-name">' + item.name + '</div><div class="cart-item-price">₹' + item.price + ' each</div></div>' +
      '<div class="cart-qty"><button type="button" class="qty-minus" data-id="' + item.productId + '">−</button><span>' + (item.quantity || 1) + '</span><button type="button" class="qty-plus" data-id="' + item.productId + '">+</button></div>' +
      '<div class="cart-item-price">₹' + (item.price * (item.quantity || 1)).toFixed(0) + '</div>' +
      '<button type="button" class="btn btn-danger btn-remove" data-id="' + item.productId + '">Remove</button></div>';
  }).join('');
  if (totalEl) totalEl.textContent = '₹' + totalAmount;
  if (finalEl) finalEl.textContent = '₹' + totalAmount;
  container.querySelectorAll('.qty-minus').forEach(function(btn) { btn.addEventListener('click', function() { updateCartQuantity(btn.dataset.id, -1); }); });
  container.querySelectorAll('.qty-plus').forEach(function(btn) { btn.addEventListener('click', function() { updateCartQuantity(btn.dataset.id, 1); }); });
  container.querySelectorAll('.btn-remove').forEach(function(btn) { btn.addEventListener('click', function() { removeFromCart(btn.dataset.id); }); });
}

