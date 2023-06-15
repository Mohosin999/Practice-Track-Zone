module.exports = {
  // ...other Jest configurations
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  testEnvironment: "jest-environment-jsdom",
};
