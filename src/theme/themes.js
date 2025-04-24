// Theme definitions for light and dark modes

// Common values shared between themes
const common = {
  transitions: {
    default: '0.3s ease'
  }
};

// Light theme
export const lightTheme = {
  ...common,
  colors: {
    primary: '#3861fb',
    secondary: '#6c757d',
    background: '#f8f9fa',
    surface: '#ffffff',
    text: {
      primary: '#212529',
      secondary: '#6c757d'
    },
    border: '#dee2e6',
    shadow: 'rgba(0, 0, 0, 0.1)',
    positive: '#16c784',
    negative: '#ea3943',
    warning: '#f3a712'
  }
};

// Dark theme
export const darkTheme = {
  ...common,
  colors: {
    primary: '#3861fb',
    secondary: '#6c757d',
    background: '#1a1a1a',
    surface: '#222222',
    text: {
      primary: '#f8f9fa',
      secondary: '#adb5bd'
    },
    border: '#343a40',
    shadow: 'rgba(0, 0, 0, 0.3)',
    positive: '#16c784',
    negative: '#ea3943',
    warning: '#f3a712'
  }
};

// Get theme based on mode
export const getTheme = (mode) => {
  return mode === 'dark' ? darkTheme : lightTheme;
};
