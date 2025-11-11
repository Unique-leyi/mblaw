import { extendTheme } from '@chakra-ui/react';

const styles = {
  global: () => ({
    body: {
      bg: '#f9fafb !important',
      color: '#000',
    },
  }),
};

const colors = {
  brand: {
    100: "#0B1D3A",
    200: "#00000099",
    300: "#FFFFFF",
    400: "#4B5563",
    500: "#0B1D3A05",
    600: "#121416",
    700: "#F9FAFB",
    800: "#F4F6F7"
  },
};

const gradients = {
  primary: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%)",
  secondary: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  radialPrimary: "radial-gradient(circle, #667eea 0%, #764ba2 100%)",
  radialSoft: "radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.05) 100%)",
};

const fonts = {
  heading: `'Cormorant Garamond', serif;`,
  body: `'Manrope', sans-serif`,
  openSans: `'Open Sans', sans-serif`,
};


const components = {
  Button: {
    variants: {
      gradient: {
        background: gradients.primary,
        color: 'white',
        _hover: {
          background: gradients.secondary,
          transform: 'translateY(-2px)',
        },
        _active: {
          transform: 'translateY(0)',
        },
      },
      gradientOutline: {
        background: 'transparent',
        border: '2px solid transparent',
        backgroundImage: `${gradients.primary}, linear-gradient(white, white)`,
        color: 'transparent',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        _hover: {
          backgroundImage: `${gradients.secondary}, linear-gradient(white, white)`,
        },
      },
    },
  },
  Box: {
    variants: {
      gradientBg: (props) => ({
        background: gradients[props.gradient] || gradients.primary,
      }),
    },
  },
  Alert: {
    baseStyle: {
      container: {
        color: 'white !important',
      },
      title: {
        color: 'white !important',
      },
      description: {
        color: 'white !important',
      },
      icon: {
        color: 'white !important',
      },
    },
    variants: {
      solid: {
        container: {
          color: 'white !important',
        },
      },
      'left-accent': {
        container: {
          color: 'white !important',
        },
      },
      'top-accent': {
        container: {
          color: 'white !important',
        },
      },
      subtle: {
        container: {
          color: 'white !important',
        },
      },
    },
  },
  Modal: {
    baseStyle: {
      content: {
        bg: '#fff !important',
      },
    },
  },
};

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles,
  colors,
  fonts,
  components,
  gradients,
});

export default theme;