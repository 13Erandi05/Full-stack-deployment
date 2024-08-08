module.exports = {
  setupFilesAfterEnv: ["./src/setupTest.js"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
};
