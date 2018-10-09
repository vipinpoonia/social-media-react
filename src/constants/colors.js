const toRGB = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : null;
};

const toRGBA = (hex, alpha) => {
  const rgb = toRGB(hex);
  return rgb ? `rgba(${rgb.join(', ')}, ${alpha})` : null;
};

const COLORS = {
  PRIMARY: '#1657E4',
  TEXT_PRIMARY: '#000000',
  TEXT_SECONDARY: toRGBA('#000000', 0.6),
  TEXT_LIGHT: toRGBA('#000000', 0.4),
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  BODY: '#F1F4FB',
  BORDER: '#ECEEF7',
  AS_HEADER_BACKGROUND: '#EDF1FB',
  LIGHT_BLUE: '#E8F5FD',
  BLUE: '#3BB9E3'
};

export default COLORS;
