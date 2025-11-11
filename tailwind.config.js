// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        // 전체 기본 sans 폰트를 Pretendard로
    sans: ["Pretendard", "system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        // 필요하면 별칭도 하나 더
        pretendard: ["Pretendard", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
