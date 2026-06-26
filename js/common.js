const SkyGo = {
  storage: {
    get(key) {
      try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
      } catch (e) {
        return null;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        console.warn('Storage set failed:', e);
      }
    },
    remove(key) {
      try {
        localStorage.removeItem(key);
      } catch (e) {}
    }
  },

  theme: {
    init() {
      const savedTheme = SkyGo.storage.get('skygo-theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = savedTheme || (prefersDark ? 'dark' : 'light');
      this.apply(theme);
    },
    apply(theme) {
      const html = document.documentElement;
      if (theme === 'light') {
        html.classList.remove('dark');
        html.classList.add('light');
        html.setAttribute('data-theme', 'light');
      } else {
        html.classList.remove('light');
        html.classList.add('dark');
        html.setAttribute('data-theme', 'dark');
      }
      SkyGo.storage.set('skygo-theme', theme);
    },
    toggle() {
      const current = document.documentElement.classList.contains('light') ? 'light' : 'dark';
      const next = current === 'light' ? 'dark' : 'light';
      this.apply(next);
      return next;
    }
  },

  auth: {
    getUser() {
      return SkyGo.storage.get('skygo-user');
    },
    setUser(user) {
      SkyGo.storage.set('skygo-user', user);
    },
    logout() {
      SkyGo.storage.remove('skygo-user');
    },
    isLoggedIn() {
      return !!this.getUser();
    },
    requireLogin() {
      if (!this.isLoggedIn()) {
        window.location.href = 'login.html';
        return false;
      }
      return true;
    }
  },

  ui: {
    toast(message, type = 'info', duration = 3000) {
      const toast = document.createElement('div');
      const colors = {
        success: 'var(--fb-state-success)',
        error: 'var(--fb-state-error)',
        warning: 'var(--fb-state-warning)',
        info: 'var(--fb-primary)'
      };
      const icons = {
        success: 'check-circle',
        error: 'x-circle',
        warning: 'alert-triangle',
        info: 'info'
      };
      
      toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 20px;
        background: var(--fb-bg-surface);
        border: 1px solid var(--fb-border);
        border-left: 4px solid ${colors[type]};
        border-radius: var(--fb-radius-md);
        color: var(--fb-fg-primary);
        font-size: var(--fb-text-sm);
        box-shadow: var(--fb-shadow-float-lg);
        animation: slideIn 0.3s ease-out;
        max-width: 360px;
      `;
      
      toast.innerHTML = `
        <i data-lucide="${icons[type]}" style="width: 18px; height: 18px; color: ${colors[type]}; flex-shrink: 0;"></i>
        <span style="flex: 1;">${message}</span>
      `;
      
      document.body.appendChild(toast);
      
      if (window.lucide) {
        lucide.createIcons({ root: toast });
      }
      
      setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => toast.remove(), 300);
      }, duration);
    },

    confirm(message, title = '确认') {
      return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
          position: fixed;
          inset: 0;
          z-index: 9998;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn 0.2s ease-out;
        `;
        
        const modal = document.createElement('div');
        modal.style.cssText = `
          background: var(--fb-bg-surface);
          border: 1px solid var(--fb-border);
          border-radius: var(--fb-radius-lg);
          padding: 24px;
          max-width: 400px;
          width: 100%;
          box-shadow: var(--fb-shadow-float-lg);
          animation: slideUp 0.3s ease-out;
        `;
        
        modal.innerHTML = `
          <h3 style="margin: 0 0 12px 0; font-size: var(--fb-text-lg); font-weight: 600; color: var(--fb-fg-primary);">${title}</h3>
          <p style="margin: 0 0 24px 0; font-size: var(--fb-text-sm); color: var(--fb-fg-secondary); line-height: 1.6;">${message}</p>
          <div style="display: flex; gap: 12px; justify-content: flex-end;">
            <button class="cancel-btn" style="padding: 8px 16px; border: 1px solid var(--fb-border); background: transparent; color: var(--fb-fg-secondary); border-radius: var(--fb-radius-md); cursor: pointer; font-size: var(--fb-text-sm); transition: all 0.2s;">取消</button>
            <button class="confirm-btn" style="padding: 8px 16px; border: none; background: linear-gradient(135deg, var(--fb-primary), var(--fb-state-info)); color: white; border-radius: var(--fb-radius-md); cursor: pointer; font-size: var(--fb-text-sm); font-weight: 500; transition: all 0.2s;">确定</button>
          </div>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        const cleanup = (result) => {
          overlay.style.animation = 'fadeIn 0.2s ease-out reverse';
          setTimeout(() => overlay.remove(), 200);
          resolve(result);
        };
        
        modal.querySelector('.cancel-btn').onclick = () => cleanup(false);
        modal.querySelector('.confirm-btn').onclick = () => cleanup(true);
        overlay.onclick = (e) => { if (e.target === overlay) cleanup(false); };
      });
    },

    loading(show, container = document.body) {
      let overlay = container.querySelector('.loading-overlay');
      if (show) {
        if (overlay) return;
        overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        overlay.style.cssText = `
          position: absolute;
          inset: 0;
          background: rgba(15,23,42,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          border-radius: inherit;
        `;
        overlay.innerHTML = `
          <div style="width: 40px; height: 40px; border: 3px solid var(--fb-border); border-top-color: var(--fb-primary); border-radius: 50%; animation: spin 0.8s linear infinite;"></div>
        `;
        if (getComputedStyle(container).position === 'static') {
          container.style.position = 'relative';
        }
        container.appendChild(overlay);
      } else {
        if (overlay) overlay.remove();
      }
    }
  },

  utils: {
    formatPrice(price) {
      return '¥' + Number(price).toLocaleString('zh-CN');
    },
    formatDate(date) {
      const d = new Date(date);
      return d.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
    },
    formatTime(date) {
      const d = new Date(date);
      return d.toTimeString().slice(0, 5);
    },
    validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },
    validatePhone(phone) {
      return /^1[3-9]\d{9}$/.test(phone);
    },
    validateEmailOrPhone(value) {
      return this.validateEmail(value) || this.validatePhone(value);
    },
    debounce(fn, delay = 300) {
      let timer;
      return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
      };
    },
    throttle(fn, limit = 300) {
      let inThrottle;
      return function(...args) {
        if (!inThrottle) {
          fn.apply(this, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    }
  }
};

const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
  SkyGo.theme.init();
});
