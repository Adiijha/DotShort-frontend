import React, { useState } from "react";
import InputField from "../shortenLink/InputField";
import ShortenedLink from "../shortenLink/ShortenedLink";
import { shortenUrl } from "../../api/api";
import { Link } from "react-router-dom";
import Header from "../dashboard/Header";

const LinkShort: React.FC = () => {
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const MAX_FREE_LINKS = 50;

  const getShortenedCount = () => {
    const count = localStorage.getItem("shortenedCount");
    return count ? parseInt(count, 10) : 0;
  };

  const incrementShortenedCount = () => {
    const currentCount = getShortenedCount();
    localStorage.setItem("shortenedCount", (currentCount + 1).toString());
  };

  const handleShorten = async (url: string) => {
    setError(null);

    const currentCount = getShortenedCount();
    if (currentCount >= MAX_FREE_LINKS) {
      setError(
        `You have reached the limit of ${MAX_FREE_LINKS} links. Please log in for unlimited access.`
      );
      return;
    }

    setLoading(true);

    try {
      const { shortUrl } = await shortenUrl(url);
      setShortenedUrl(shortUrl);
      incrementShortenedCount(); // Increment the count on successful shortening
    } catch (err) {
      setError("Failed to shorten the URL. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row min-h-screen text-white">
      {/* Sidebar (Header Component) */}
      <Header />

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-xl bg-white/10 backdrop-blur-lg border border-white/20 p-6 sm:p-8 rounded-xl shadow-xl space-y-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center text-teal-400">
            Shorten Your Link
          </h2>

          {/* Input Field */}
          <InputField onShorten={handleShorten} isLoading={loading} />

          {/* Shortened URL and Error Display */}
          <ShortenedLink shortenedUrl={shortenedUrl} error={error} />

          {/* Navigation Link */}
          <div className="text-center text-sm sm:text-lg text-gray-300">
            Want to generate a QR instead?{" "}
            <Link to="/dashboard/qr" className="text-teal-400 hover:underline">
              Generate QR
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkShort;
