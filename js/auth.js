/** LENSKART - User Auth (LocalStorage: users, currentUser) */
function getUsers() { var d = localStorage.getItem('users'); return d ? JSON.parse(d) : []; }
function saveUsers(users) { localStorage.setItem('users', JSON.stringify(users)); }
function getCurrentUser() { var d = localStorage.getItem('currentUser'); return d ? JSON.parse(d) : null; }
function setCurrentUser(user) { localStorage.setItem('currentUser', JSON.stringify(user)); }
function clearCurrentUser() { localStorage.removeItem('currentUser'); }

function registerUser(name, email, password) {
  var users = getUsers();
  if (users.some(function(u) { return u.email.toLowerCase() === email.trim().toLowerCase(); }))
    return { success: false, message: 'Email already registered.' };
  users.push({ id: Date.now().toString(), name: name.trim(), email: email.trim().toLowerCase(), password: password, createdAt: new Date().toISOString() });
  saveUsers(users);
  return { success: true, message: 'Registration successful. Please login.' };
}

function loginUser(email, password) {
  var users = getUsers();
  var user = users.find(function(u) { return u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password; });
  if (!user) return { success: false, message: 'Invalid email or password.' };
  var out = { id: user.id, name: user.name, email: user.email };
  setCurrentUser(out);
  return { success: true, user: out };
}

function logoutUser() { clearCurrentUser(); window.location.href = 'index.html'; }

function requireUser() {
  var user = getCurrentUser();
  if (!user) { window.location.href = 'login.html'; return null; }
  return user;
}

function redirectIfLoggedIn() { if (getCurrentUser()) window.location.href = 'index.html'; }

function deleteUser(id) {
  var users = getUsers().filter(function(u) { return u.id !== id; });
  saveUsers(users);
}
