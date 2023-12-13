/* eslint-disable */
export default {
  displayName: 'frontend',
  preset: '../../jest.preset.js',
  transformIgnorePatterns: ["node_modules/(?!swiper|ssr-window|dom7).*/"],
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/frontend',
  moduleNameMapper: {
    "swiper/css": "swiper/swiper.min.css"
  },
  setupFilesAfterEnv: ['../../setupTests.ts'],
};
