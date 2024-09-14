import { SignJWT, jwtVerify } from "jose";

const refreshAuthToken = async (refreshToken, secretKey) => {
  try {
    const { payload } = await jwtVerify(refreshToken, secretKey);

    if (payload.role !== "admin") {
      const newToken = await new SignJWT({ role: "admin" })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("1h")
        .sign(secretKey);

      return newToken;
    } else {
      throw new Error("Unauthorized");
    }
  } catch (err) {
    throw new Error("Failed to refresh token");
  }
};

export default refreshAuthToken;