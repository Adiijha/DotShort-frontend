import React, { useState } from "react";
import InputField from "./InputField";
import ShortenedLink from "./ShortenedLink";
import { shortenUrl } from "../../api/api";
import { Link } from "react-router-dom";

const Shorten: React.FC = () => {
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleShorten = async (url: string) => {
    setError(null);
    setLoading(true);

    try {
      const { shortUrl } = await shortenUrl(url);
      setShortenedUrl(shortUrl);
      setQrCode(qrCode);
    } catch (err) {
      setError("Failed to shorten the URL. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col py-10 md:py-12 px-2 md:px-6">
      <div className="w-full p-0 md:p-8">
        {/* Input Field */}
        <InputField onShorten={handleShorten} isLoading={loading} />

        {/* Shortened URL and QR Code */}
        <ShortenedLink
          shortenedUrl={shortenedUrl}
          error={error}
        />
        <div className="text-center text-white text-md md:text-lg">
          Want to generate a QR instead?{" "}
          <Link to="/generateqr">
            <span className="text-teal-400">Generate QR</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Shorten;
