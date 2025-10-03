// Animation configurations for smooth, performant animations
export const animations = {
  // Page transitions
  pageTransition: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3, ease: "easeOut" },
  },

  // Card hover animations
  cardHover: {
    initial: { scale: 1, y: 0 },
    hover: {
      scale: 1.02,
      y: -4,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    tap: { scale: 0.98 },
  },

  // Button animations
  buttonHover: {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    transition: { duration: 0.2, ease: "easeOut" },
  },

  // Fade in animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5, ease: "easeOut" },
  },

  // Slide up animations
  slideUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: "easeOut" },
  },

  // Stagger animations for lists
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },

  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  },

  // Loading animations
  loading: {
    animate: {
      rotate: 360,
      transition: { duration: 1, repeat: Infinity, ease: "linear" },
    },
  },

  // Scale animations
  scaleIn: {
    initial: { scale: 0 },
    animate: { scale: 1 },
    transition: { duration: 0.3, ease: "easeOut" },
  },

  // Bounce animations
  bounce: {
    animate: {
      y: [0, -10, 0],
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  },

  // Shake animations for errors
  shake: {
    animate: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  },

  // Modal animations
  modal: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: { duration: 0.2, ease: "easeOut" },
  },

  // Drawer animations
  drawer: {
    initial: { x: "-100%" },
    animate: { x: 0 },
    exit: { x: "-100%" },
    transition: { duration: 0.3, ease: "easeOut" },
  },

  // Toast animations
  toast: {
    initial: { opacity: 0, y: 50, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 50, scale: 0.9 },
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

// Performance-optimized animation variants
export const optimizedAnimations = {
  // Reduced motion for accessibility
  reducedMotion: {
    pageTransition: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.2 },
    },
    cardHover: {
      initial: { opacity: 1 },
      hover: { opacity: 0.9 },
    },
  },

  // GPU-accelerated animations
  gpuAccelerated: {
    transform: "translateZ(0)",
    willChange: "transform, opacity",
  },
};

// Animation utilities
export const animationUtils = {
  // Check if user prefers reduced motion
  prefersReducedMotion: () => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  },

  // Get appropriate animation based on user preference
  getAnimation: (animationName: keyof typeof animations) => {
    if (animationUtils.prefersReducedMotion()) {
      return (
        optimizedAnimations.reducedMotion[animationName] ||
        animations[animationName]
      );
    }
    return animations[animationName];
  },

  // Stagger delay calculation
  getStaggerDelay: (index: number, baseDelay: number = 0.1) => {
    return index * baseDelay;
  },
};

// Animation presets for common use cases
export const animationPresets = {
  // Product card animations
  productCard: {
    container: animations.staggerContainer,
    item: {
      ...animations.staggerItem,
      ...animations.cardHover,
    },
  },

  // Navigation animations
  navigation: {
    item: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.3, ease: "easeOut" },
    },
  },

  // Form animations
  form: {
    field: {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.2, ease: "easeOut" },
    },
    error: animations.shake,
  },

  // Loading states
  loading: {
    spinner: animations.loading,
    skeleton: {
      animate: {
        opacity: [0.5, 1, 0.5],
        transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
      },
    },
  },
};
