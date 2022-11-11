const Neutral = {
  50: '#fafafa',
  100: '#f5f5f5',
  200: '#e5e5e5',
  300: '#d4d4d4',
  400: '#a3a3a3',
  500: '#737373',
  600: '#525252',
  700: '#404040',
  800: '#262626',
  900: '#171717',
};

export default {
  fg: Neutral[100],
  fg2: Neutral[400],
  bg: Neutral[900],
  brd: Neutral[400],
  btnbg: `linear-gradient(
    90deg,
    rgba(0, 255, 255, 1) 0%,
    rgba(255, 0, 255, 1) 100%
  )`,
  main: Neutral[800],
  mainmo: Neutral[700],
};
