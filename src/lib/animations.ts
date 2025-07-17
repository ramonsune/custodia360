// Utilidades de animación para custodia360
// Sistema consistente de animaciones para todas las páginas

export const animationClasses = {
  // Animaciones de entrada
  fadeInUp: "animate-fade-in-up",
  fadeInLeft: "animate-fade-in-left",
  fadeInRight: "animate-fade-in-right",
  bounceIn: "animate-bounce-in",

  // Efectos continuos
  float: "animate-float",
  pulseGentle: "animate-pulse-gentle",
  gradient: "animate-gradient",
  dropdown: "animate-dropdown",

  // Efectos hover
  hoverLift: "hover-lift",
  cardHover: "card-hover",
  iconBounce: "icon-bounce",

  // Transiciones
  smooth: "transition-smooth",
  bounce: "transition-bounce",

  // Botones especiales
  primaryGlow: "btn-primary-glow",
  animated: "btn-animated",

  // Utilidades de rendimiento
  gpuAccelerated: "gpu-accelerated",
  animateElement: "animate-element",

  // Focus y accesibilidad
  focusRing: "focus-ring",

  // Delays escalonados
  delays: {
    1: "stagger-delay-1",
    2: "stagger-delay-2",
    3: "stagger-delay-3",
    4: "stagger-delay-4",
    5: "stagger-delay-5",
    6: "stagger-delay-6"
  }
} as const;

export const pageAnimations = {
  // Para páginas completas
  pageEnter: "page-enter",
  sectionEnter: "section-enter",
  cardEnter: "card-enter",

  // Para grids animados
  animatedGrid: "animated-grid"
} as const;

// Configuración de velocidades
export const animationConfig = {
  speeds: {
    fast: "var(--animation-speed-fast)",
    normal: "var(--animation-speed-normal)",
    slow: "var(--animation-speed-slow)"
  },
  easings: {
    default: "var(--animation-easing)",
    bounce: "var(--animation-easing-bounce)"
  }
} as const;

// Hook personalizado para aplicar animaciones de entrada
export const useEntranceAnimation = (delay: number = 0) => {
  return `${animationClasses.fadeInUp} ${animationClasses.delays[delay as keyof typeof animationClasses.delays] || ''} ${animationClasses.animateElement}`.trim();
};

// Función para generar clases de grid animado
export const generateGridAnimation = (itemCount: number) => {
  const baseClasses = `${pageAnimations.animatedGrid} ${animationClasses.gpuAccelerated}`;
  return baseClasses;
};

// Clases para elementos interactivos
export const interactiveClasses = `${animationClasses.hoverLift} ${animationClasses.smooth} ${animationClasses.focusRing}`;

// Clases para cards estándar
export const cardClasses = `${animationClasses.cardHover} ${animationClasses.smooth} ${animationClasses.animateElement}`;

// Clases para botones principales
export const primaryButtonClasses = `${animationClasses.primaryGlow} ${animationClasses.animated} ${animationClasses.hoverLift} ${animationClasses.focusRing} ${animationClasses.gpuAccelerated}`;

// Clases para iconos interactivos
export const iconClasses = `${animationClasses.iconBounce} ${animationClasses.smooth}`;

// Utilidad para combinar clases de animación
export const combineAnimationClasses = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

// Configuración responsiva
export const responsiveAnimations = {
  // Ocultar animaciones complejas en móvil
  desktopOnly: "hidden md:block",
  mobileOptimized: "md:animate-float animate-none", // Ejemplo
};

// Estados iniciales para animaciones
export const initialStates = {
  fadeInUp: "fade-in-up-initial",
  fadeInLeft: "fade-in-left-initial",
  fadeInRight: "fade-in-right-initial"
};
