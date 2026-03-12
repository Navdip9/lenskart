/** LENSKART - Admin Dashboard stats (users, products, orders, revenue) */
/* Note: Core storage functions are now in storage.js (loaded before this file) */

function getTotalUsers() { 
  var users = getUsers();
  return users ? users.length : 0; 
}

function getTotalProducts() { 
  var products = getProducts();
  return products ? products.length : 0; 
}

function getTotalOrders() { 
  var orders = getOrders();
  return orders ? orders.length : 0; 
}

function getTotalRevenue() {
  var orders = getOrders();
  return orders
    .filter(function(o) { return (o.status || 'Pending') !== 'Cancelled'; })
    .reduce(function(s, o) { return s + (o.totalAmount || 0); }, 0);
}

function renderDashboardStats() {
  var u = document.getElementById('stat-users');
  var p = document.getElementById('stat-products');
  var o = document.getElementById('stat-orders');
  var r = document.getElementById('stat-revenue');
  if (u) u.textContent = getTotalUsers();
  if (p) p.textContent = getTotalProducts();
  if (o) o.textContent = getTotalOrders();
  if (r) r.textContent = '₹' + getTotalRevenue().toFixed(0);
}

function renderContactMessages(containerId) {
  var container = document.getElementById(containerId);
  if (!container) return;
  var contacts = getAdminContacts();
  if (contacts.length === 0) { container.innerHTML = '<p class="alert alert-info">No contact messages yet.</p>'; return; }
  container.innerHTML = contacts.map(function(c) {
    return '<div class="contact-msg"><div class="meta"><strong>' + c.name + '</strong> (' + c.email + ') — ' + new Date(c.date).toLocaleString() + '</div><div class="message">' + (c.message || '-') + '</div></div>';
  }).join('');
}

