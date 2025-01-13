import axios from "axios";

const BACKEND_URL = "http://localhost:5000";

export const shortenUrl = async (url: string): Promise<string> => {
  try {
    const response = await axios.post(`${BACKEND_URL}/shorten`, { longUrl: url });
    return response.data.data.shortUrl;
    
  } catch (error) {
    console.error("Error shortening the URL:", error);
    throw new Error("Error shortening the URL. Please try again.");
  }
};
