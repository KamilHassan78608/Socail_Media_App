// ===== CONFIG =====
const API_BASE = 'http://localhost:5001/api';

// ===== AUTH HELPERS =====
const getToken = () => localStorage.getItem('token');
const getUser = () => JSON.parse(localStorage.getItem('user') || 'null');
const setAuth = (token, user) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};
const clearAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
const isLoggedIn = () => !!getToken();

// ===== REDIRECT GUARD =====
const requireAuth = () => {
  if (!isLoggedIn()) { window.location.href = '/frontend/pages/login.html'; return false; }
  return true;
};
const redirectIfLoggedIn = () => {
  if (isLoggedIn()) { window.location.href = '/frontend/index.html'; }
};

// ===== FETCH WRAPPER =====
const apiFetch = async (endpoint, options = {}) => {
  const token = getToken();
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers
    },
    ...options
  };

  if (options.body instanceof FormData) {
    delete config.headers['Content-Type'];
  }

  const response = await fetch(`${API_BASE}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

// ===== TOAST =====
const showToast = (message, type = 'default') => {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = `toast ${type}`;
  void toast.offsetWidth;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
};

// ===== AVATAR HELPER =====
const getAvatarHTML = (user, size = '') => {
  const sizeClass = size ? `avatar-${size}` : '';
  if (user?.avatar) {
    return `<img class="avatar ${sizeClass}" src="http://localhost:5000${user.avatar}" alt="${user.username}" onerror="this.outerHTML=getInitialsAvatar('${user.username}','${sizeClass}')">`;
  }
  return getInitialsAvatar(user?.username || '?', sizeClass);
};

const getInitialsAvatar = (username, sizeClass = '') => {
  const initial = (username || '?').charAt(0).toUpperCase();
  return `<div class="avatar avatar-placeholder ${sizeClass}">${initial}</div>`;
};

// ===== TIME HELPER =====
const timeAgo = (dateStr) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d`;
  return new Date(dateStr).toLocaleDateString();
};

// ===== POPULATE NAV USER =====
const populateNavUser = () => {
  const user = getUser();
  if (!user) return;

  const navUserEl = document.getElementById('nav-user');
  if (navUserEl) {
    navUserEl.innerHTML = `
      ${getAvatarHTML(user, 'sm')}
      <div class="nav-user-info">
        <div class="name">${user.fullName || user.username}</div>
        <div class="handle">@${user.username}</div>
      </div>
      <span style="color:var(--text-muted);font-size:18px">⋯</span>
    `;
    navUserEl.onclick = () => { window.location.href = `/frontend/pages/profile.html?u=${user.username}`; };
  }

  // Logout
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.onclick = () => {
      clearAuth();
      window.location.href = '/frontend/pages/login.html';
    };
  }
};
