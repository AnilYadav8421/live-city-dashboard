// src/services/authService.js

export const loginUser = async ({ username, password }) => {
  // mock delay
  await new Promise((res) => setTimeout(res, 500));

  if (username === "admin" && password === "admin123") {
    return {
      id: 1,
      username: "admin",
      token: "mock-jwt-token",
    };
  }

  throw new Error("Invalid credentials");
};
