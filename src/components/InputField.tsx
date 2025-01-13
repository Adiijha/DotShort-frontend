import React, { useState } from "react";

interface InputFieldProps {
  onShorten: (url: string) => void;
  isLoading: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ onShorten, isLoading }) => {
  const [url, setUrl] = useState<string>("");

  const handleSubmit = () => {
    if (url.trim()) {
      onShorten(url);
      setUrl("");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your URL here"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition"
        disabled={isLoading}
      >
        {isLoading ? "Shortening..." : "Shorten URL"}
      </button>
    </div>
  );
};

export default InputField;
