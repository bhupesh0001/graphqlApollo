const NAMED_COLORS = {
  // grayscale (light to dark)
  white: "rgba(255, 255, 255, 1)",
  bianca: "rgba(251, 249, 240, 1)",
  timberwolf: "rgba(218, 216, 210, 1)",
  gray: "rgba(128,128,128,1)",
  silver: "rgba(192,192,192,1)",
  magnesium: "rgba(178, 178, 178, 1)",
  black: "rgba(3, 3, 3, 1)",

  // the rest
  blue: "rgba(29, 86, 251, 1)",
  royalblue: "rgba(43, 96, 222,1)",
  yellow: "rgba(246, 253, 55, 1)",
  green: "rgba(106, 246, 162, 1)",
  turquoise: "rgba(0, 205, 223, 1)",
  purple: "rgba(144, 63, 199, 1)",
  pink: "rgba(245, 64, 199, 1)",
  darkPink: "rgba(200, 40, 159, 1)",
  orange: "rgba(247, 144, 77, 1)",
  salmon: "rgba(243, 91, 89, 1)"
};

const THEME_COLORS = {
  // alias the named colors by use-case
  headerText: NAMED_COLORS.white,
  lightBackground: NAMED_COLORS.white,
  darkBackground: NAMED_COLORS.blue,
  lightText: NAMED_COLORS.gray,
  iconBackground: NAMED_COLORS.white,
  actionButton: NAMED_COLORS.green,
  activityIndicator: NAMED_COLORS.royalblue,
  hyperLink: NAMED_COLORS.blue
};

export { NAMED_COLORS, THEME_COLORS };
