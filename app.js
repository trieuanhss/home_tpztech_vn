/**
 * TPZTech Studio - Vue 3 Main Application
 * Liquid Glassmorphism Landing Page Engine with Swiper.js Carousels
 */

const { createApp, ref, reactive, computed, onMounted, onUnmounted, nextTick } = Vue;

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

    // Custom Glass Dropdowns
    const isThemeDropdownOpen = ref(false);
    const isLangDropdownOpen = ref(false);

    // Upcoming Games Filtering & Modal
    const activeCategory = ref('all');
    const selectedGame = ref(null);
    const preregisterEmail = ref('');

    // Toast Notifications
    const toast = reactive({
      show: false,
      message: '',
      timer: null
    });

    // Swiper instances storage
    let aboutSwiperInstance = null;
    let servicesSwiperInstance = null;
    let gamesSwiperInstance = null;
    let techSwiperInstance = null;
    let partnersSwiperInstance = null;

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
      // Update swipers text/measurements if needed
      nextTick(() => {
        updateAllSwipers();
      });
    };

    // 4.1 Dropdown Actions
    const toggleThemeDropdown = () => {
      isThemeDropdownOpen.value = !isThemeDropdownOpen.value;
      if (isThemeDropdownOpen.value) isLangDropdownOpen.value = false;
    };

    const toggleLangDropdown = () => {
      isLangDropdownOpen.value = !isLangDropdownOpen.value;
      if (isLangDropdownOpen.value) isThemeDropdownOpen.value = false;
    };

    const closeAllDropdowns = () => {
      isThemeDropdownOpen.value = false;
      isLangDropdownOpen.value = false;
    };

    const selectTheme = (newTheme) => {
      setTheme(newTheme);
      isThemeDropdownOpen.value = false;
    };

    const selectLang = (newLang) => {
      setLang(newLang);
      isLangDropdownOpen.value = false;
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
      nextTick(() => {
        if (gamesSwiperInstance) {
          gamesSwiperInstance.update();
          gamesSwiperInstance.slideTo(0);
        }
      });
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

    // 6. Navigation Interactions
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

    // 7. Swiper Initializer using Swiper.js library
    const initSwipers = () => {
      if (typeof Swiper === 'undefined') {
        console.warn('Swiper.js library not loaded yet');
        return;
      }

      nextTick(() => {
        // 1. About Swiper (Tầm nhìn & Sứ mệnh)
        if (document.querySelector('.about-swiper')) {
          if (aboutSwiperInstance) aboutSwiperInstance.destroy(true, true);
          aboutSwiperInstance = new Swiper('.about-swiper', {
            slidesPerView: 1,
            spaceBetween: 24,
            grabCursor: true,
            breakpoints: {
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 }
            },
            pagination: {
              el: '.about-pagination',
              clickable: true
            },
            navigation: {
              nextEl: '.about-next',
              prevEl: '.about-prev'
            }
          });
        }

        // 2. Services Swiper (Lĩnh vực hoạt động & Dịch vụ)
        if (document.querySelector('.services-swiper')) {
          if (servicesSwiperInstance) servicesSwiperInstance.destroy(true, true);
          servicesSwiperInstance = new Swiper('.services-swiper', {
            slidesPerView: 1,
            spaceBetween: 24,
            grabCursor: true,
            breakpoints: {
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 }
            },
            pagination: {
              el: '.services-pagination',
              clickable: true
            },
            navigation: {
              nextEl: '.services-next',
              prevEl: '.services-prev'
            }
          });
        }

        // 3. Upcoming Games Swiper (Dự án game sắp ra mắt)
        if (document.querySelector('.games-swiper')) {
          if (gamesSwiperInstance) gamesSwiperInstance.destroy(true, true);
          gamesSwiperInstance = new Swiper('.games-swiper', {
            slidesPerView: 1,
            spaceBetween: 24,
            grabCursor: true,
            breakpoints: {
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 }
            },
            pagination: {
              el: '.games-pagination',
              clickable: true
            },
            navigation: {
              nextEl: '.games-next',
              prevEl: '.games-prev'
            }
          });
        }

        // 4. Tech Stack Swiper (Công nghệ nền tảng)
        if (document.querySelector('.tech-swiper')) {
          if (techSwiperInstance) techSwiperInstance.destroy(true, true);
          techSwiperInstance = new Swiper('.tech-swiper', {
            slidesPerView: 2,
            spaceBetween: 16,
            grabCursor: true,
            breakpoints: {
              480: { slidesPerView: 3, spaceBetween: 16 },
              768: { slidesPerView: 4, spaceBetween: 20 },
              1024: { slidesPerView: 6, spaceBetween: 20 }
            },
            pagination: {
              el: '.tech-pagination',
              clickable: true
            },
            navigation: {
              nextEl: '.tech-next',
              prevEl: '.tech-prev'
            }
          });
        }

        // 5. Strategic Partners Swiper (Đối tác chiến lược)
        if (document.querySelector('.partners-swiper')) {
          if (partnersSwiperInstance) partnersSwiperInstance.destroy(true, true);
          partnersSwiperInstance = new Swiper('.partners-swiper', {
            slidesPerView: 1,
            spaceBetween: 24,
            grabCursor: true,
            breakpoints: {
              640: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 24 },
              1100: { slidesPerView: 3, spaceBetween: 24 }
            },
            pagination: {
              el: '.partners-pagination',
              clickable: true
            },
            navigation: {
              nextEl: '.partners-next',
              prevEl: '.partners-prev'
            }
          });
        }
      });
    };

    const updateAllSwipers = () => {
      if (aboutSwiperInstance) aboutSwiperInstance.update();
      if (servicesSwiperInstance) servicesSwiperInstance.update();
      if (gamesSwiperInstance) gamesSwiperInstance.update();
      if (techSwiperInstance) techSwiperInstance.update();
      if (partnersSwiperInstance) partnersSwiperInstance.update();
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
        initSwipers();
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
        const sections = ['home', 'about', 'services', 'games', 'tech-stack', 'partners'];
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

      // Click outside to close dropdowns
      const handleDocClick = (e) => {
        closeAllDropdowns();
      };
      document.addEventListener('click', handleDocClick);
    });

    onUnmounted(() => {
      document.removeEventListener('click', closeAllDropdowns);
      if (systemThemeMediaQuery) {
        systemThemeMediaQuery.removeEventListener('change', handleSystemThemeChange);
      }
      if (aboutSwiperInstance) aboutSwiperInstance.destroy();
      if (servicesSwiperInstance) servicesSwiperInstance.destroy();
      if (gamesSwiperInstance) gamesSwiperInstance.destroy();
      if (techSwiperInstance) techSwiperInstance.destroy();
      if (partnersSwiperInstance) partnersSwiperInstance.destroy();
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
      toast,
      t,
      setTheme,
      setLang,
      filteredGames,
      setCategory,
      openGameModal,
      closeGameModal,
      handlePreregister,
      toggleMobileMenu,
      closeMobileMenu,
      scrollToSection,
      isThemeDropdownOpen,
      isLangDropdownOpen,
      toggleThemeDropdown,
      toggleLangDropdown,
      closeAllDropdowns,
      selectTheme,
      selectLang
    };
  }
});

// Mount Vue app once DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  app.mount('#app');
});
