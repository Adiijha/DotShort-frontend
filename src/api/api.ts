import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;
const USER_URL = import.meta.env.VITE_API_USER_URL;

interface ShortenUrlResponse {
  shortUrl: string;
  expiresAt?: string; // Optional expiration date
}

interface QrUrlResponse {
  qrCode: string;
}


interface LoginResponse {
  data: {
    accessToken: string; // Assuming the access token is inside the 'data' field
  };
  user: {
    id: string;
    name: string;
    email: string;
    username: string;
  };
}

// Interface for Register User Input
interface RegisterUserInput {
  name: string;
  username: string;
  email: string;
  password: string;
}

// Interface for Register User Response
interface RegisterUserResponse {
  message: string;
}

// Interface for User Profile Response
interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
}


export const shortenUrl = async (
  url: string,
  shortCode?: string,
  password?: string,
  expireInHours?: number
): Promise<ShortenUrlResponse> => {
  try {
    // Prepare the request body with optional parameters
    const requestBody: any = {
      longUrl: url,
    };

    if (shortCode) requestBody.shortCode = shortCode;
    if (password) requestBody.password = password;
    if (expireInHours) requestBody.expireInHours = expireInHours;

    // Send request to the backend
    const response = await axios.post(`${BACKEND_URL}/shorten`, requestBody);

    // Ensure response only contains the needed data: shortUrl and expiresAt
    const { shortUrl, expiresAt } = response.data.data;

    // Return only the necessary data (no QR code in response)
    return { shortUrl, expiresAt };
  } catch (error) {
    console.error("Error shortening the URL:", error);
    throw new Error("Error shortening the URL. Please try again.");
  }
};



export const qrUrl = async (url: string): Promise<QrUrlResponse> => {
  try {
    const response = await axios.post(`${BACKEND_URL}/shorten`, { longUrl: url });
    const { qrCode } = response.data.data;

    return {qrCode };
  } catch (error) {
    console.error("Error shortening the QR:", error);
    throw new Error("Error shortening the QR. Please try again.");
  }
};


export const loginUser = async (
  emailOrUsername: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      `${USER_URL}/login`, // Use the base URL with the login endpoint
      { emailOrUsername, password },
      {
        withCredentials: true, // Ensure cookies are sent/received for authentication
      }
    );

    return response.data; // Return server response data
  } catch (error: any) {
    // Log detailed error info for debugging
    console.error("Login API Error:", error.response || error.message);

    // Extract error message from server or fallback to a default message
    const message =
      error?.response?.data?.message ||
      error.message ||
      "An unexpected error occurred while logging in";

    throw new Error(message); // Re-throw error with user-friendly message
  }
};

// Logout User Function
export const logoutUser = async (token: string): Promise<string> => {
  try {
    const response = await axios.post(
      `${USER_URL}/logout`,
      {}, // Empty body
      {
        headers: { Authorization: `Bearer ${token}` }, // Pass token as Bearer
        withCredentials: true, // Ensure cookies are included
      }
    );

    return response.data.message; // Return success message
  } catch (error: any) {
    const message = error?.response?.data?.message || error.message || "Error logging out.";
    throw new Error(message);
  }
};

// Get Logged-in User's Profile Function
export const getUserProfile = async (): Promise<UserProfile> => {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("Authentication token is missing. Please log in again.");
    }

    const response = await axios.get<UserProfile>(`${USER_URL}/user/profile`, {
      withCredentials: true, // Send cookies if the backend uses them
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the request
      },
    });

    return response.data; // Successfully fetched profile data
  } catch (error: any) {
    console.error("Error fetching user profile:", error); // Log detailed error for debugging
    const message =
      error?.response?.data?.message || error.message || "Failed to fetch user profile.";
    throw new Error(message);
  }
};

// Register User Function
export const registerUser = async (
  input: RegisterUserInput
): Promise<RegisterUserResponse> => {
  try {
    const response = await axios.post<RegisterUserResponse>(`${USER_URL}/register`, input);
    return response.data; // Return success message for OTP sent
  } catch (error: any) {
    const message = error?.response?.data?.message || error.message || "Error registering user.";
    throw new Error(message);
  }
};



