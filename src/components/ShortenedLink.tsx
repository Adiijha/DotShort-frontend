import React from "react";

interface ShortenedLinkProps {
  shortenedUrl: string | null;
  error: string | null;
}

const ShortenedLink: React.FC<ShortenedLinkProps> = ({ shortenedUrl, error }) => {
  const handleCopy = () => {
    if (shortenedUrl) {
      navigator.clipboard.writeText(shortenedUrl).then(() => {
        alert("URL copied to clipboard!");
      }).catch((err) => {
        console.error("Error copying URL:", err);
      });
    }
  };

  return (
    <div>
      {shortenedUrl && (
        <div className="mt-4">
          <p className="text-green-400">Shortened URL:</p>
          <div className="flex items-center">
            <a
              href={shortenedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline font-bold mr-2"
            >
              {shortenedUrl}
            </a>
            <button
              onClick={handleCopy}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md font-semibold"
            >
              Copy
            </button>
          </div>
        </div>
      )}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default ShortenedLink;
