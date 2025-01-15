import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;

interface ShortenUrlResponse {
  shortUrl: string;
}

interface QrUrlResponse {
  qrCode: string;
}

export const shortenUrl = async (url: string): Promise<ShortenUrlResponse> => {
  try {
    const response = await axios.post(`${BACKEND_URL}/shorten`, { longUrl: url });
    const { shortUrl } = response.data.data;

    return { shortUrl };
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

