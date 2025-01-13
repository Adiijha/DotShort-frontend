import React, { useState } from "react";
import Header from "./components/Header";
import InputField from "./components/InputField";
import ShortenedLink from "./components/ShortenedLink";
import { shortenUrl } from "./api/api";

const App: React.FC = () => {
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleShorten = async (url: string) => {
    setError(null);
    setLoading(true);

    try {
      const shortUrl = await shortenUrl(url);
      console.log(shortUrl);
      setShortenedUrl(shortUrl);
    } catch (err) {
      setError("Failed to shorten the URL. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <Header />
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 sm:w-96">
        <InputField onShorten={handleShorten} isLoading={loading} />
        <ShortenedLink shortenedUrl={shortenedUrl} error={error} />
      </div>
    </div>
  );
};

export default App;
