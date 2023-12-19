const mediaSize = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1440,
};

const breakpoint = {
  xs: `@media (min-width: ${mediaSize.xs}px)`,
  sm: `@media (min-width: ${mediaSize.sm}px)`,
  md: `@media (min-width: ${mediaSize.md}px)`,
  lg: `@media (min-width: ${mediaSize.lg}px)`,
  xl: `@media (min-width: ${mediaSize.xl}px)`,
  xxl: `@media (min-width: ${mediaSize.xxl}px)`,
};
const theme = {
  breakpoint: breakpoint,
};

const color = {
  background: '#F6F6F8',
  primary: '#014DB8',
  secondary: ' #73A4EA;',
  text: {
    normal: '#004DBC',
  },
  black: '#000000',
  white: '#ffffff',
};

const zIndex = {
  top: 1000,
  coverHeader: 200,
  header: 100,
  coverContent: 10,
};

export default theme;
export { breakpoint, color, zIndex };
