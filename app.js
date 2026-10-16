/**
 * TPZTech Studio - Vue 3 Main Application
 * Apple Liquid Glassmorphism Landing Page Engine
 */

const { createApp, ref, reactive, computed, onMounted, onUnmounted } = Vue;

const app = createApp({
  setup() {
    // 1. Reactive State
    const config = ref(null);
    const isLoading = ref(true);
    const loadError = ref(null);

    // Theme state ('dark' | 'light' | 'auto')
    const theme = ref(localStorage.getItem('tpz_theme') || 'auto');

    // Language state ('vi' | 'en')
    const lang = ref(localStorage.getItem('tpz_lang') || 'vi');

    // Navigation and mobile menu
    const isMobileMenuOpen = ref(false);
    const activeSection = ref('home');

    // Upcoming Games Filtering & Modal
    const activeCategory = ref('all');
    const selectedGame = ref(null);
    const preregisterEmail = ref('');

    // Contact Form
    const contactForm = reactive({
      name: '',
      email: '',
      service: 'game',
      message: ''
    });
    const isSubmittingContact = ref(false);

    // Toast Notifications
    const toast = reactive({
      show: false,
      message: '',
      timer: null
    });

    // 2. Localization Helper
    const t = (item) => {
      if (!item) return '';
      if (typeof item === 'object' && (item.vi !== undefined || item.en !== undefined)) {
        return item[lang.value] || item.vi || item.en || '';
      }
      return item;
    };

    // 3. Theme Management
    const applyTheme = () => {
      let resolvedTheme = theme.value;
      if (resolvedTheme === 'auto') {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        resolvedTheme = prefersDark ? 'dark' : 'light';
      }
      document.documentElement.setAttribute('data-theme', resolvedTheme);
    };

    const setTheme = (newTheme) => {
      theme.value = newTheme;
      localStorage.setItem('tpz_theme', newTheme);
      applyTheme();
    };

    // Listen to OS theme changes if on 'auto' mode
    let systemThemeMediaQuery = null;
    const handleSystemThemeChange = () => {
      if (theme.value === 'auto') {
        applyTheme();
      }
    };

    // 4. Language Management
    const setLang = (newLang) => {
      lang.value = newLang;
      localStorage.setItem('tpz_lang', newLang);
      document.documentElement.setAttribute('lang', newLang);
    };

    // 5. Games Filtering & Modal Methods
    const filteredGames = computed(() => {
      if (!config.value || !config.value.upcomingGames) return [];
      if (activeCategory.value === 'all') {
        return config.value.upcomingGames;
      }
      return config.value.upcomingGames.filter(g => g.category === activeCategory.value);
    });

    const setCategory = (catId) => {
      activeCategory.value = catId;
    };

    const openGameModal = (game) => {
      selectedGame.value = game;
      preregisterEmail.value = '';
      document.body.style.overflow = 'hidden';
    };

    const closeGameModal = () => {
      selectedGame.value = null;
      preregisterEmail.value = '';
      document.body.style.overflow = '';
    };

    const showToast = (message, duration = 3500) => {
      if (toast.timer) clearTimeout(toast.timer);
      toast.message = message;
      toast.show = true;
      toast.timer = setTimeout(() => {
        toast.show = false;
        toast.timer = null;
      }, duration);
    };

    const handlePreregister = () => {
      if (!preregisterEmail.value || !preregisterEmail.value.includes('@')) {
        const errMsg = t(config.value?.toasts?.validationError) || 'Vui lòng nhập địa chỉ email hợp lệ';
        showToast(errMsg, 3000);
        return;
      }

      const successMsg = t(config.value?.toasts?.preregisterSuccess) || 'Đăng ký thành công!';
      showToast(successMsg, 4000);
      closeGameModal();
    };

    // 6. Contact Form Submission
    const handleContactSubmit = () => {
      if (!contactForm.name || !contactForm.email || !contactForm.message) {
        const errMsg = t(config.value?.toasts?.validationError) || 'Vui lòng điền đầy đủ các thông tin cần thiết';
        showToast(errMsg, 3000);
        return;
      }

      isSubmittingContact.value = true;
      setTimeout(() => {
        isSubmittingContact.value = false;
        const successMsg = t(config.value?.toasts?.contactSuccess) || 'Đã gửi lời nhắn thành công!';
        showToast(successMsg, 4000);
        contactForm.name = '';
        contactForm.email = '';
        contactForm.service = 'game';
        contactForm.message = '';
      }, 600);
    };

    // 7. Navigation Interactions
    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;
    };

    const closeMobileMenu = () => {
      isMobileMenuOpen.value = false;
    };

    const scrollToSection = (sectionId) => {
      closeMobileMenu();
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        activeSection.value = sectionId;
      }
    };

    // 8. Load Configuration Data
    const loadConfig = async () => {
      try {
        isLoading.value = true;
        const res = await fetch('config.json');
        if (!res.ok) {
          throw new Error(`Failed to load config.json (status: ${res.status})`);
        }
        config.value = await res.json();
      } catch (err) {
        console.warn('Could not load config.json via fetch, using fallback data:', err.message);
        loadError.value = err.message;
      } finally {
        isLoading.value = false;
      }
    };

    // 9. Lifecycle hooks
    onMounted(() => {
      applyTheme();
      document.documentElement.setAttribute('lang', lang.value);

      if (window.matchMedia) {
        systemThemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        systemThemeMediaQuery.addEventListener('change', handleSystemThemeChange);
      }

      loadConfig();

      // Keyboard Esc to close modal
      const handleKeyDown = (e) => {
        if (e.key === 'Escape' && selectedGame.value) {
          closeGameModal();
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      // Section spy on scroll
      const handleScroll = () => {
        const sections = ['home', 'about', 'services', 'games', 'partners', 'contact'];
        const scrollPosition = window.scrollY + 200;
        for (const id of sections) {
          const el = document.getElementById(id);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              activeSection.value = id;
            }
          }
        }
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
    });

    onUnmounted(() => {
      if (systemThemeMediaQuery) {
        systemThemeMediaQuery.removeEventListener('change', handleSystemThemeChange);
      }
    });

    return {
      config,
      isLoading,
      loadError,
      theme,
      lang,
      isMobileMenuOpen,
      activeSection,
      activeCategory,
      selectedGame,
      preregisterEmail,
      contactForm,
      isSubmittingContact,
      toast,
      t,
      setTheme,
      setLang,
      filteredGames,
      setCategory,
      openGameModal,
      closeGameModal,
      handlePreregister,
      handleContactSubmit,
      toggleMobileMenu,
      closeMobileMenu,
      scrollToSection
    };
  }
});

// Mount Vue app once DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  app.mount('#app');
});
